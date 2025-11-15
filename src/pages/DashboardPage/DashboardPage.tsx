import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faLinkedin,
  faGithub,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "./DashboardPage.css";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { HeaderBrand } from "../../components/HeaderBrand/HeaderBrand";

export function DashboardPage() {
  return (
    <div className="body">
      <motion.header
        initial={{
          y: "-50px",
          filter: "blur(10px)",
        }}
        animate={{
          y: "0px",
          filter: "blur(0px)",
        }}
        transition={{
          delay: 0,
          duration: 0.5,
        }}
        className="dashboard-header"
      >
        <HeaderBrand className="" onClick={() => window.location.reload()}/>
        

        <nav className="header-social">
          <a href="https://www.linkedin.com/in/yesehakkebere/" target="_blank">
            <FontAwesomeIcon
              icon={faLinkedin}
              size="xl"
              className="faLinkedin-icon"
            />
          </a>
          <a href="https://github.com/tonyk-code" target="_blank">
            <FontAwesomeIcon
              icon={faGithub}
              size="xl"
              className="faGithub-icon"
            />
          </a>
          <a href="https://www.instagram.com/yesehakkebere" target="_blank">
            <FontAwesomeIcon
              icon={faInstagram}
              size="xl"
              className="faInstagram-icon"
            />
          </a>
          <a href="https://www.tiktok.com/@codeolympus" target="_blank">
            <FontAwesomeIcon
              icon={faTiktok}
              size="xl"
              className="faTiktok-icon"
            />
          </a>
        </nav>

        <div className="header-actions">
          <Link to="/login">
            <button className="btn-login">
              <span className="hover-underline-animation">Login</span>
            </button>
          </Link>
          <span className="separate-login-signup">/</span>
          <Link to="/sign-up">
            <button className="btn-sign-up">
              Sign up
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      </motion.header>

      <main className="hero">
        <section className="hero-content">
          <motion.div
            initial={{
              opacity: 0,
              y: "-20px",
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: "0px",
              filter: "blur(0px)",
            }}
            viewport={{
              amount: 0.5,
              once: true,
            }}
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
            className="hero-visual"
          >
            <img
              src="DashboardPageImage.png"
              alt="Dashboard illustration"
              loading="lazy"
              width={750}
              height={500}
              className="hero-illustration"
            />
            <p className="hero-heading">Achieve Your </p>
            <svg
              width="50"
              height="10"
              viewBox="0 0 200 10"
              xmlns="http://www.w3.org/2000/svg"
              className="tapered-line-svg"
            >
              <path d="M0,5 Q100,0 200,5 Q100,10 0,5 Z" fill="#445677ff" />
            </svg>
            <p className="hero-subheading">Productivity Goals</p>
            <div className="line-design">
              <img
                src="line Design.png"
                alt=""
                height={250}
                className="line-design-img"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: "-20px",
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: "0px",
              filter: "blur(0px)",
            }}
            viewport={{
              amount: 0.5,
              once: true,
            }}
            transition={{
              delay: 1.5,
              duration: 0.5,
            }}
            className="hero-description"
          >
            <div className="hero-text">
              <p>
                <span className="highlight">Our team of experienced </span>
                task managers is dedicated to keeping your goals on track,
                optimizing your workflow, and helping you achieve consistent
                success with confidence.
              </p>
            </div>

            <div className="hero-feedback">
              <div className="feedback-header">
                <div className="feedback-profile">
                  <img
                    src="rainer-unsplash.png"
                    width={40}
                    height={40}
                    alt="User avatar"
                    className="feedback-avatar"
                  />
                  <div className="feedback-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      width={20}
                      height={20}
                    >
                      <path
                        d="M342.6 41.4C330.1 28.9 309.8 28.9 297.3 41.4L169.3 169.4C156.8 181.9 156.8 202.2 169.3 214.7C181.8 227.2 202.1 227.2 214.6 214.7L288 141.3L288 576C288 593.7 302.3 608 320 608C337.7 608 352 593.7 352 576L352 141.3L425.4 214.7C437.9 227.2 458.2 227.2 470.7 214.7C483.2 202.2 483.2 181.9 470.7 169.4L342.7 41.4z"
                        fill="rgba(112, 111, 111, 1)"
                      />
                    </svg>
                  </div>
                </div>

                <p className="feedback-message">
                  So many people liked this service
                </p>
              </div>

              <div className="feedback-stars">
                <motion.svg
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: [1, 2, 1],
                  }}
                  transition={{
                    delay: 2.1,
                    duration: 0.5,
                  }}
                  viewBox="0 0 24 24"
                  className="star"
                >
                  <path
                    fill="#FFC107"
                    d="M12 2L15 9h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z"
                  />
                </motion.svg>

                <motion.svg
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: [1, 2, 1],
                  }}
                  transition={{
                    delay: 2.2,
                    duration: 0.5,
                  }}
                  viewBox="0 0 24 24"
                  className="star"
                >
                  <path
                    fill="#FFC107"
                    d="M12 2L15 9h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z"
                  />
                </motion.svg>
                <motion.svg
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: [1, 2, 1],
                  }}
                  transition={{
                    delay: 2.3,
                    duration: 0.5,
                  }}
                  viewBox="0 0 24 24"
                  className="star"
                >
                  <path
                    fill="#FFC107"
                    d="M12 2L15 9h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z"
                  />
                </motion.svg>
                <motion.svg
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: [1, 2, 1],
                  }}
                  transition={{
                    delay: 2.4,
                    duration: 0.5,
                  }}
                  viewBox="0 0 24 24"
                  className="star"
                >
                  <path
                    fill="#FFC107"
                    d="M12 2L15 9h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z"
                  />
                </motion.svg>
                <motion.svg
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: [1, 2, 1],
                  }}
                  transition={{
                    delay: 2.5,
                    duration: 0.5,
                  }}
                  viewBox="0 0 24 24"
                  className="star"
                >
                  <path
                    fill="#FFC107"
                    d="M12 2L15 9h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z"
                  />
                </motion.svg>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="hero-section hero-section-2">
          <motion.div
            initial={{
              opacity: 0,
              y: "-20px",
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: "0px",
              filter: "blur(0px)",
            }}
            viewport={{
              amount: 0.5,
              once: true,
            }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
            className="hero-tagline"
          >
            <p>
              <span className="text-accent">Modern </span>Work Platform
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: "-20px",
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: "0px",
              filter: "blur(0px)",
            }}
            viewport={{
              amount: 0.5,
              once: true,
            }}
            transition={{
              delay: 2,
              duration: 0.5,
            }}
            className="hero-container"
          >
            <div className="hero-visual-3d">
              <img src="3d sphere.png" width={130} height={130} />
            </div>

            <div className="hero-stats">
              <div className="hero-stats-number">
                17M<sup>+</sup>
              </div>
              <div className="hero-stats-text">
                Millions of users rely on Notiq worldwide
              </div>
            </div>

            <div className="hero-learn-more">
              <button className="btn-learn-more">Learn more</button>
              <p className="hero-learn-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" />
                </svg>
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <footer>
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          viewport={{
            amount: 0.5,
            once: true,
          }}
          transition={{
            delay: 2,
            duration: 0.7,
          }}
          className="footer-section"
        >
          <FontAwesomeIcon icon={faCopyright} />
          Copyright
        </motion.div>
      </footer>
    </div>
  );
}
