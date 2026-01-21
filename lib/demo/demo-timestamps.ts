// Demo timestamp data for showing "Last synced" functionality

// Default: 2 minutes ago (fresh data)
export const DEMO_LAST_SYNCED = new Date(Date.now() - 2 * 60 * 1000);

// Various test timestamps
export const DEMO_TIMESTAMPS = {
  fresh: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
  recent: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
  warning: new Date(Date.now() - 7 * 60 * 1000), // 7 minutes ago (shows yellow)
  stale: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago (shows red)
  old: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
};

export const DEMO_SYNC_STATUS: 'syncing' | 'synced' | 'error' = 'synced';
