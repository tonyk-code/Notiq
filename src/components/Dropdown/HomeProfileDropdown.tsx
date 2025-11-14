import { motion } from "framer-motion";
import useHomePageLogic from "../../hooks/useHomePageLogic";
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../hooks/useAuth";
import { useFilter } from "../../hooks/useFilter";

export const HomeProfileDropdown = () => {
  const { setDeleteConfirmation } = useHomePageLogic();
  const { signout, user } = useAuth();
  const { accountActions, setAccountActions } = useFilter();
  return (
    <div>
      <div
        className="header-right-homepage"
        onClick={() => setAccountActions(!accountActions)}
      >
        {user?.photoURL !== null ? (
          <img
            src={user?.photoURL}
            alt="Profile"
            style={{ borderRadius: "50%" }}
            width={30}
            height={30}
          />
        ) : (
          <i
            className="fa-solid fa-circle-user fa-xl"
            style={{ color: "#107bf7" }}
          ></i>
        )}
        <p className="account-name">{user?.displayName}</p>
      </div>
      {accountActions && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: "90px",
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="account-actions"
        >
          <motion.button
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="signout-button danger-button"
            onClick={() => {
              signout.mutate();
            }}
          >
            {signout.isPending ? (
              <Spinner color="dot-spinner-black" />
            ) : (
              "Sign out"
            )}
          </motion.button>
          <motion.button
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setDeleteConfirmation(true)}
            className="delete-account-button danger-button"
          >
            Delete account
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
