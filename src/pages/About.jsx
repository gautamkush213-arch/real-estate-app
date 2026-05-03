import React from 'react'
import { Link } from 'react-router-dom'
import styles from './About.module.css'

const team = [
  { name: 'Arjun Mehta', role: 'CEO & Co-Founder', initial: 'A' },
  { name: 'Priya Sharma', role: 'Head of Listings', initial: 'P' },
  { name: 'Rahul Verma', role: 'Lead Architect', initial: 'R' },
  { name: 'Sneha Nair', role: 'Client Relations', initial: 'S' },
]

const values = [
  { emoji: '🤝', title: 'Trust First', desc: 'Every listing is verified, every agent vetted. We stake our reputation on accuracy.' },
  { emoji: '💎', title: 'Premium Quality', desc: 'We curate only the finest properties that meet our standards of excellence.' },
  { emoji: '🌱', title: 'Sustainable Future', desc: 'We prioritize eco-conscious properties and sustainable development.' },
  { emoji: '🚀', title: 'Innovation', desc: 'Leveraging technology to make property search seamless and delightful.' },
]

function About() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.eyebrow}>Our Story</div>
          <h1 className={styles.title}>Redefining Real Estate<br />in India</h1>
          <p className={styles.subtitle}>
            Founded in 2020, EstateVista was born from a simple belief: finding your dream home
            should be a joyful experience, not a stressful one.
          </p>
        </div>
        <div className={styles.heroImg}>
          <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&q=80" alt="Our office" />
          <div className={styles.heroOverlay} />
        </div>
      </div>

      {/* Mission */}
      <section className={`section ${styles.missionSection}`}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionImg}>
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Team" />
            </div>
            <div className={styles.missionContent}>
              <div className={styles.sectionEyebrow}>Our Mission</div>
              <h2 className={styles.sectionTitle}>Building Connections,<br />Creating Homes</h2>
              <p className={styles.missionText}>
                We believe that a home is more than four walls — it's where life happens. 
                Our mission is to connect discerning buyers and renters with extraordinary properties 
                across India's most coveted addresses.
              </p>
              <p className={styles.missionText}>
                With a team of over 200 property experts spread across 48 cities, 
                we bring unparalleled local knowledge and global standards of service to every transaction.
              </p>
              <Link to="/listings" className="btn btn-primary" style={{marginTop: '8px'}}>
                Explore Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <div className={styles.sectionEyebrow}>What We Stand For</div>
            <h2 className={styles.sectionTitle}>Our Values</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <span className={styles.valueEmoji}>{v.emoji}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`section ${styles.teamSection}`}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <div className={styles.sectionEyebrow}>The People</div>
            <h2 className={styles.sectionTitle}>Meet Our Leadership</h2>
          </div>
          <div className={styles.teamGrid}>
            {team.map((m, i) => (
              <div key={i} className={styles.memberCard}>
                <div className={styles.memberAvatar}>{m.initial}</div>
                <div className={styles.memberName}>{m.name}</div>
                <div className={styles.memberRole}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Ready to Find Your Home?</h2>
          <p className={styles.ctaDesc}>Join thousands of happy homeowners who found their perfect property with EstateVista.</p>
          <Link to="/listings" className="btn btn-primary">Browse Listings</Link>
        </div>
      </section>
    </div>
  )
}

export default About