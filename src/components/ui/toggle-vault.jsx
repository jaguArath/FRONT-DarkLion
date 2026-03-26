'use client';;
import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const VaultContext = createContext(undefined);

export const ToggleVault = ({
  children,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <VaultContext.Provider value={{ open, toggleOpen }}>
      <div className={`relative w-full h-full min-h-20 ${className}`}>
        {children}
      </div>
    </VaultContext.Provider>
  );
};

export const ToggleVaultTrigger = ({
  children,
  className = '',
}) => {
  const context = useContext(VaultContext);
  if (!context)
    throw new Error('ToggleVaultTrigger must be inside ToggleVault');
  const { open, toggleOpen } = context;

  if (open) return null;

  return (
    <motion.div
      onClick={toggleOpen}
      aria-expanded={open}
      className={`
        absolute top-4 right-4 w-25 h-10 rounded-full flex items-center justify-center
        cursor-pointer z-50 transition-all duration-300 hover:scale-105 shadow-lg
        bg-black text-white dark:bg-white dark:text-black
        ${className}
      `}>
      <motion.span
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        className='font-bold'>
        {children}
      </motion.span>
    </motion.div>
  );
};

export const ToggleVaultClose = ({
  children,
  className = '',
}) => {
  const context = useContext(VaultContext);
  if (!context) throw new Error('ToggleVaultClose must be inside ToggleVault');
  const { open, toggleOpen } = context;
  if (!open) return null;

  return (
    <motion.div
      onClick={toggleOpen}
      key='close'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      className={`
        absolute top-4 right-4 w-25 h-10 rounded-full flex items-center justify-center
        z-50 font-bold cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg
        bg-white text-black dark:bg-black dark:text-white
        ${className}
      `}>
      {children}
    </motion.div>
  );
};

export const ToggleVaultContent = ({
  children,
  className = '',
}) => {
  const context = useContext(VaultContext);
  if (!context)
    throw new Error('ToggleVaultContent must be inside ToggleVault');
  const { open, toggleOpen } = context;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key='panel'
          initial={{
            scaleX: 0.2,
            scaleY: 0.066,
            top: '1rem',
            right: '1rem',
            opacity: 0,
          }}
          animate={{
            scaleX: 1,
            scaleY: 1,
            top: '0.6rem',
            right: '0.6rem',
            opacity: 1,
            transition: { duration: 0.7, ease: [0.2, 0.9, 0.3, 1] },
          }}
          exit={{
            scaleX: 0.2,
            scaleY: 0.066,
            top: '1rem',
            right: '1rem',
            opacity: 0,
            transition: { duration: 0.6, ease: [0.2, 0.9, 0.3, 1] },
          }}
          className={`
            absolute w-auto max-h-35 min-w-59  rounded-2xl overflow-hidden z-40 shadow-lg 
            bg-black text-white dark:bg-white dark:text-black
            ${className}
          `}
          style={{ transformOrigin: 'top right' }}
          aria-hidden={!open}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
            exit={{ opacity: 0 }}
            className='p-6 px-2 flex flex-col gap-3 font-bold font-bricolage'>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};











