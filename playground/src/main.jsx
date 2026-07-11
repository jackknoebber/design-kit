import React from 'react';
import { createRoot } from 'react-dom/client';
import 'design-kit/styles.css';
import 'design-kit/themes/cupertino.css';
import 'design-kit/themes/ios26.css';
import 'design-kit/themes/gumroad.css';
import './playground.css';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
