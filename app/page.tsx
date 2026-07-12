'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import styles from '../styles/Home.module.css';

function DemoMeetingTab() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  React.useEffect(() => {
    setRoomName(generateRoomId());
  }, []);

  const startMeeting = (event: React.FormEvent) => {
    event.preventDefault();
    if (roomName.trim() && userName.trim()) {
      let url = `/rooms/${roomName.trim()}?participantName=${encodeURIComponent(userName.trim())}`;
      if (e2ee) {
        url += `#${encodePassphrase(sharedPassphrase)}`;
      }
      router.push(url);
    }
  };
  return (
    <form className={styles.tabContent} onSubmit={startMeeting}>
      <p style={{ margin: 0 }}>Try KarSmiths Meet for free.</p>
      <input
        type="text"
        id="roomName"
        name="roomName"
        placeholder="Room Name"
        value={roomName}
        onChange={(ev) => setRoomName(ev.target.value)}
        required
      />
      <input
        type="text"
        id="userName"
        name="userName"
        placeholder="User Name"
        value={userName}
        onChange={(ev) => setUserName(ev.target.value)}
        required
      />
      <button style={{ marginTop: '1rem' }} className="lk-button" type="submit">
        Start Meeting
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>
    </form>
  );
}

export default function Page() {
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <div className="header">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', margin: '0 0 0.5rem', fontFamily: 'system-ui, sans-serif', background: 'linear-gradient(to right, #ff6352, #ff8c00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            KarSmiths Meet
          </h1>
          <h2 style={{ fontFamily: 'system-ui, sans-serif' }}>
            Premium video conferencing application powered by Next.js and{' '}
            <a href="https://karsmiths.com/" rel="noopener" target="_blank">
              KarSmiths
            </a>.
          </h2>
        </div>
        <div className={styles.tabContainer}>
          <DemoMeetingTab />
        </div>
      </main>
      <footer data-lk-theme="default">
        Powered by{' '}
        <a href="https://karsmiths.com/" rel="noopener" target="_blank">
          KarSmiths
        </a>
        .
      </footer>
    </>
  );
}
