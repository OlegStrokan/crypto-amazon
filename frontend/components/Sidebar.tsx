import React from 'react';
import { ConnectButton } from 'web3uikit';
import Image from 'next/image'
import Link from 'next/link';


const isAuthenticated = true;
const username = 'Oleh'

export const Sidebar = () => {

  const styles = {

  }
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {
          isAuthenticated && (
            <>
              <div className={styles.profilePicContainer}>
                <Image
                  src={`https://avatars.dicebear.com/api/pixel-art/${username}.svg`}
                  alt="profile"
                  className={styles.profilePic}
                  height={100}
                  width={100}
                />
              </div>
              {!username ? (
                <>
                  <div className={styles.username}>
                    <input
                      type="text"
                      placeholder="Username"
                      // value={nickname}
                      className={styles.usernameInput}
                      // onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>
                  <button
                    className={styles.setNickname}
                    // onClick={handleUsername}
                  >
                    Set Nickname
                  </button>
                </>
              ) : (
                <div>
                  <div className={styles.welcome}>Welcome {username}</div>
                </div>
              )}
            </>
          )}
        <div className={styles.connectButton}>
          <ConnectButton/>
        </div>
      </div>
      <div className={styles.menu}>
        <Link href='/'>
          <div className={styles.menuItem}>
            <Image
            src={logo}
            height={30}
            width={30}
            className={styles.amazonLogo}
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
