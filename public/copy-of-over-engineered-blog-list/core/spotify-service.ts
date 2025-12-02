export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string;
  played_at: string;
}

// Helper function to get a fresh access token from refresh token
const getAccessToken = async (): Promise<string | null> => {
  try {
    // For browser environment, we need to use a proxy or the token will be exposed
    // For now, let's return a mock response if we're in browser
    if (typeof window !== 'undefined') {
      console.warn('Spotify API calls from browser require CORS proxy. Using fallback data.');
      return null;
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${process.env.VITE_SPOTIFY_CLIENT_ID}:${process.env.VITE_SPOTIFY_CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: process.env.VITE_SPOTIFY_REFRESH_TOKEN || '',
      }),
    });

    if (!response.ok) {
      console.warn('Failed to refresh Spotify token:', response.status);
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing Spotify token:', error);
    return null;
  }
};

export const getLatestTracks = async (): Promise<SpotifyTrack[]> => {
  try {
    // Get fresh access token
    const accessToken = await getAccessToken();
    if (!accessToken) {
      // Return fallback data for demo purposes
      return [
        {
          id: '1',
          name: 'Blinding Lights',
          artist: 'The Weeknd',
          album: 'After Hours',
          url: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b',
          image: '',
          played_at: new Date().toISOString()
        },
        {
          id: '2', 
          name: 'Levitating',
          artist: 'Dua Lipa',
          album: 'Future Nostalgia',
          url: 'https://open.spotify.com/track/5yUbyW1MfxqBc0ZkUp1xNG',
          image: '',
          played_at: new Date().toISOString()
        }
      ];
    }

    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('Spotify API request failed:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists.map((a: any) => a.name).join(', '),
      album: item.track.album.name,
      url: item.track.external_urls.spotify,
      image: item.track.album.images[0]?.url || '',
      played_at: item.played_at,
    }));
  } catch (error) {
    console.error('Error fetching Spotify tracks:', error);
    // Return fallback data on error
    return [
      {
        id: 'fallback',
        name: 'Music Loading...',
        artist: 'Spotify API',
        album: 'Portfolio',
        url: '#',
        image: '',
        played_at: new Date().toISOString()
      }
    ];
  }
};
