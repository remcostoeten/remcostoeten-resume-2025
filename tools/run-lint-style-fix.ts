import { Project, SyntaxKind } from 'ts-morph'

const project = new Project()
project.addSourceFilesAtPaths(['src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/.next/**'])

for (const sourceFile of project.getSourceFiles()) {
	const arrowFunctions = sourceFile.getDescendantsOfKind(SyntaxKind.ArrowFunction)
	for (const af of arrowFunctions.reverse()) {
		const parent = af.getParent()
		if (parent.getKind() === SyntaxKind.VariableDeclaration) {
			const varDecl = parent
			const varStmt = varDecl.getParent().getParent()
			if (varStmt.getKind() === SyntaxKind.VariableStatement) {
				const name = varDecl.getName()
				const isExported = varStmt.isExported()
				const params = af
					.getParameters()
					.map(function (p) {
						return p.getText()
					})
					.join(', ')
				const returnType = af.getReturnTypeNode()
					? `: ${af.getReturnTypeNode().getText()}`
					: ''
				const isAsync = af.isAsync() ? 'async ' : ''
				let bodyText = af.getBodyText()

				if (af.getBody().getKind() !== SyntaxKind.Block) {
					bodyText = `return ${bodyText};`
				}

				if (varStmt.getDeclarationList().getDeclarations().length === 1) {
					const funcText = `${isExported ? 'export ' : ''}${isAsync}function ${name}(${params})${returnType} {\n${bodyText}\n}`
					varStmt.replaceWithText(funcText)
					continue
				}
			}
		}
	}

	const typeDecls = sourceFile.getTypeAliases()
	const interfaceDecls = sourceFile.getInterfaces()
	const allDecls = [...typeDecls, ...interfaceDecls].filter(function (d) {
		return !d.isExported()
	})

	if (allDecls.length === 1) {
		const decl = allDecls[0]
		const name = decl.getName()

		if (decl.getKind() === SyntaxKind.InterfaceDeclaration) {
			const intf = decl
			if (name !== 'Props') {
				intf.rename('Props')
			}

			const typeText = `type Props = {
${intf
	.getMembers()
	.map(function (m) {
		return m.getText()
	})
	.join('\n')}
}`

			intf.replaceWithText(typeText)
		} else if (decl.getKind() === SyntaxKind.TypeAliasDeclaration) {
			if (name !== 'Props') {
				decl.rename('Props')
			}
		}
	}

	sourceFile.saveSync()
}
