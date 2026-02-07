import React, { useState, useEffect, useRef } from 'react';
import {
  Sprout, Mail, Lock, Chrome, Github, Twitter,
  ChevronRight, Eye, EyeOff, LayoutDashboard,
  LogOut, User, Settings, Bell, Search,
  Thermometer, Droplets, Wind, Leaf, Bug,
  FlaskConical, TrendingUp, Wheat, ShieldCheck,
  Activity, Map, BarChart3, Clock, CheckCircle2,
  Camera, Upload, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const chartData = [
  { name: '08:00', temp: 24, humidity: 65, moisture: 42 },
  { name: '10:00', temp: 26, humidity: 62, moisture: 40 },
  { name: '12:00', temp: 29, humidity: 55, moisture: 38 },
  { name: '14:00', temp: 31, humidity: 50, moisture: 35 },
  { name: '16:00', temp: 28, humidity: 58, moisture: 37 },
  { name: '18:00', temp: 25, humidity: 64, moisture: 41 },
];

const LoginPage = ({ onToggle, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onLogin(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="auth-card"
    >
      <div className="auth-header">
        <div className="logo-icon">
          <Sprout size={28} />
        </div>
        <h1>AgriGuard AI</h1>
        <p>Precision analytics for the next-gen farm</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <div className="input-container">
            <Mail size={18} />
            <input
              type="email"
              className="auth-input"
              placeholder="name@farm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-container">
            <Lock size={18} />
            <input
              type={showPassword ? "text" : "password"}
              className="auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: '45px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p style={{ color: 'var(--error)', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}

        <button type="submit" className="auth-button">
          Sign In <ChevronRight size={16} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
        </button>
      </form>

      <div className="social-divider">
        <span>Or continue with</span>
      </div>

      <div className="social-grid">
        <button className="social-btn"><Chrome size={20} /></button>
        <button className="social-btn"><Github size={20} /></button>
        <button className="social-btn"><Twitter size={20} /></button>
      </div>

      <p className="auth-footer">
        New to the platform?
        <button onClick={onToggle} className="auth-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          Create an account
        </button>
      </p>
    </motion.div>
  );
};

const SignupPage = ({ onToggle, onSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onSignup(formData);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="auth-card"
    >
      <div className="auth-header">
        <div className="logo-icon">
          <Sprout size={28} />
        </div>
        <h1>Join the Future</h1>
        <p>Digitize your harvest in minutes</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              className="auth-input"
              style={{ paddingLeft: '16px' }}
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              className="auth-input"
              style={{ paddingLeft: '16px' }}
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <div className="input-container">
            <Mail size={18} />
            <input
              type="email"
              className="auth-input"
              placeholder="john@farm.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-container">
            <Lock size={18} />
            <input
              type={showPassword ? "text" : "password"}
              className="auth-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ paddingRight: '45px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p style={{ color: 'var(--error)', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}

        <button type="submit" className="auth-button">
          Create Account
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?
        <button onClick={onToggle} className="auth-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          Sign in
        </button>
      </p>
    </motion.div>
  );
};

const translations = {
  English: {
    dashboardTitle: 'Farmer Dashboard',
    dashboardSub: 'AI-Powered Precision Agriculture Insights',
    generateReport: 'Generate Report',
    cropHealth: 'Crop Health',
    pestRisk: 'Pest Risk',
    nutrientStatus: 'Nutrient Status',
    yieldForecast: 'Yield Forecast',
    excellent: 'Excellent',
    low: 'Low',
    optimal: 'Optimal',
    stable: 'Stable',
    estimated: 'Estimated',
    noDisease: 'No disease detected',
    minimalActivity: 'Minimal activity',
    nitrogenHigh: 'Nitrogen: High',
    targetYield: 'Target: 4.2t/ha',
    fieldMap: 'Field Health Map',
    mapOptimal: 'Optimal',
    mapWarning: 'Warning',
    aiVerified: 'AI verified: Sector B-12 shows early signs of nitrogen shortage.',
    recentActions: 'Recent  Actions',
    actionYield: 'Weekly yield report generated',
    actionOptimize: 'Irrigation scheduled for Sector A',
    actionAnalyze: 'Soil nutrient analysis completed',
    viewHistory: 'View Full History',
    searchPlaceholder: 'Search fields, reports, alerts...',
    notifications: 'Notifications',
    markAllRead: 'Mark all read',
    viewAllNotif: 'View All Notifications',
    aiPrefs: 'AI Preferences',
    thresholdsLabel: 'ALERT THRESHOLDS',
    notificationsLabel: 'NOTIFICATIONS',
    languageLabel: 'DASHBOARD LANGUAGE',
    sensitivity: 'Sensitivity',
    alerts: 'Alerts',
    farmManager: 'Farm Manager',
    noNotif: 'No notifications yet',
    profileTitle: 'User Profile',
    assignedFields: 'Assigned Fields',
    activityHistory: 'Activity History',
    usageMetrics: 'Usage Metrics',
    totalArea: 'Total Area',
    sensorActive: 'Active Sensors',
    reportsGenerated: 'Reports Generated',
    lastActive: 'Last Active',
    roleLabel: 'Role',
    pestAnalysisTitle: 'AI Pest Analysis (CNN)',
    preprocessing: 'Preprocessing Image...',
    uploadImage: 'Upload Crop Image',
    scanning: 'Scanning Pattern...',
    riskLow: 'Low Risk',
    riskMedium: 'Medium Risk',
    riskHigh: 'High Risk',
    pestDetected: 'Pest Pattern Detected',
    noPest: 'No Pests Found',
    confidence: 'AI Confidence',
    severityLabel: 'Severity Level',
    affectedAreaLabel: 'Affected Area',
    pestTypeLabel: 'Pest Type',
    nutrientN: 'Nitrogen (N)',
    nutrientP: 'Phosphorus (P)',
    nutrientK: 'Potassium (K)',
    statusLow: 'Low',
    statusOptimal: 'Optimal',
    statusHigh: 'High',
    yieldBasis: 'Based on 5-year historical data',
    tonnesPerHectare: 't/ha',
    zoneHealth: 'Zone Health',
    mapDanger: 'Critical',
    personalInfo: 'Personal Information',
    farmDetails: 'Farm Details',
    rolePermissions: 'Permissions & Roles',
    saveProfile: 'Save Profile Changes',
    editProfile: 'Edit Profile',
    farmName: 'Farm Name',
    farmLocation: 'Location',
    permissionsLabel: 'MODULE PERMISSIONS',
    assignedFieldsLabel: 'FIELD ASSIGNMENTS'
  },
  French: {
    dashboardTitle: 'Tableau de bord de l\'agriculteur',
    dashboardSub: 'Analyses d\'agriculture de précision alimentées par l\'IA',
    generateReport: 'Générer un rapport',
    cropHealth: 'Santé des cultures',
    pestRisk: 'Risque de ravageurs',
    nutrientStatus: 'Statut nutritionnel',
    yieldForecast: 'Prévision de rendement',
    excellent: 'Excellent',
    low: 'Faible',
    optimal: 'Optimal',
    stable: 'Stable',
    estimated: 'Estimé',
    noDisease: 'Aucune maladie détectée',
    minimalActivity: 'Activité minimale',
    nitrogenHigh: 'Azote: Élevé',
    targetYield: 'Cible: 4.2t/ha',
    fieldMap: 'Carte de santé des champs',
    mapOptimal: 'Optimal',
    mapWarning: 'Attention',
    aiVerified: 'Vérifié par l\'IA: Le secteur B-12 montre des signes précoces de carence en azote.',
    recentActions: 'Actions récentes de l\'IA',
    actionYield: 'Rapport de rendement hebdomadaire généré',
    actionOptimize: 'Irrigation programmée pour le secteur A',
    actionAnalyze: 'Analyse des échantillons de sol terminée',
    viewHistory: 'Voir l\'historique complet',
    searchPlaceholder: 'Rechercher champs, rapports, alertes...',
    notifications: 'Notifications',
    markAllRead: 'Tout marquer comme lu',
    viewAllNotif: 'Voir toutes les notifications',
    aiPrefs: 'Préférences IA',
    thresholdsLabel: 'SEUILS D\'ALERTE',
    notificationsLabel: 'NOTIFICATIONS',
    languageLabel: 'LANGUE DU TABLEAU DE BORD',
    sensitivity: 'Sensibilité',
    alerts: 'Alertes',
    farmManager: 'Directeur d\'exploitation',
    noNotif: 'Pas encore de notifications',
    profileTitle: 'Profil de l\'utilisateur',
    assignedFields: 'Champs assignés',
    activityHistory: 'Historique d\'activité',
    usageMetrics: 'Mesures d\'utilisation',
    totalArea: 'Surface totale',
    sensorActive: 'Capteurs actifs',
    reportsGenerated: 'Rapports générés',
    lastActive: 'Dernièrement actif',
    roleLabel: 'Rôle',
    pestAnalysisTitle: 'Analyse des ravageurs par IA (CNN)',
    uploadImage: 'Télécharger une image',
    scanning: 'Analyse des motifs...',
    riskLow: 'Risque faible',
    riskMedium: 'Risque moyen',
    riskHigh: 'Risque élevé',
    pestDetected: 'Motif de ravageur détecté',
    noPest: 'Aucun ravageur trouvé',
    confidence: 'Confiance de l\'IA',
    nutrientN: 'Azote (N)',
    nutrientP: 'Phosphore (P)',
    nutrientK: 'Potassium (K)',
    statusLow: 'Faible',
    statusOptimal: 'Optimal',
    statusHigh: 'Élevé',
    yieldBasis: 'Basé sur 5 ans d\'historique',
    tonnesPerHectare: 't/ha',
    zoneHealth: 'Santé de la zone',
    mapDanger: 'Critique'
  },
  Spanish: {
    dashboardTitle: 'Panel del agricultor',
    dashboardSub: 'Información de agricultura de precisión impulsada por IA',
    generateReport: 'Generar informe',
    cropHealth: 'Salud del cultivo',
    pestRisk: 'Riesgo de plagas',
    nutrientStatus: 'Estado de nutrientes',
    yieldForecast: 'Pronóstico de rendimiento',
    excellent: 'Excelente',
    low: 'Bajo',
    optimal: 'Óptimo',
    stable: 'Estable',
    estimated: 'Estimado',
    noDisease: 'No se detectaron enfermedades',
    minimalActivity: 'Actividad mínima',
    nitrogenHigh: 'Nitrógeno: Alto',
    targetYield: 'Objetivo: 4.2t/ha',
    fieldMap: 'Mapa de salud del campo',
    mapOptimal: 'Óptimo',
    mapWarning: 'Advertencia',
    aiVerified: 'Verificado por IA: El sector B-12 muestra signos tempranos de escasez de nitrógeno.',
    recentActions: 'Acciones recientes de IA',
    actionYield: 'Informe de rendimiento semanal generado',
    actionOptimize: 'Riego programado para el Sector A',
    actionAnalyze: 'Análisis de muestras de suelo completo',
    viewHistory: 'Ver historial completo',
    searchPlaceholder: 'Buscar campos, informes, alertas...',
    notifications: 'Notificaciones',
    markAllRead: 'Marcar todo como leído',
    viewAllNotif: 'Ver todas las notificaciones',
    aiPrefs: 'Preferencias de IA',
    thresholdsLabel: 'UMBRALES DE ALERTA',
    notificationsLabel: 'NOTIFICACIONES',
    languageLabel: 'IDIOMA DEL PANEL',
    sensitivity: 'Sensibilidad',
    alerts: 'Alertas',
    farmManager: 'Gerente de granja',
    noNotif: 'Aún no hay notificaciones',
    profileTitle: 'Perfil del Usuario',
    assignedFields: 'Campos Asignados',
    activityHistory: 'Historial de Actividad',
    usageMetrics: 'Métricas de Uso',
    totalArea: 'Área Total',
    sensorActive: 'Sensores Activos',
    reportsGenerated: 'Informes Generados',
    lastActive: 'Última Actividad',
    roleLabel: 'Rol',
    pestAnalysisTitle: 'Análisis de plagas por IA (CNN)',
    uploadImage: 'Subir imagen del cultivo',
    scanning: 'Escaneando patrón...',
    riskLow: 'Riesgo bajo',
    riskMedium: 'Riesgo medio',
    riskHigh: 'Riesgo alto',
    pestDetected: 'Patrón de plaga detectado',
    noPest: 'No se encontraron plagas',
    confidence: 'Confianza de la IA',
    nutrientN: 'Nitrógeno (N)',
    nutrientP: 'Fósforo (P)',
    nutrientK: 'Potasio (K)',
    statusLow: 'Bajo',
    statusOptimal: 'Óptimo',
    statusHigh: 'Alto',
    yieldBasis: 'Basado en datos de 5 años',
    tonnesPerHectare: 't/ha',
    zoneHealth: 'Salud de la zona',
    mapDanger: 'Crítico'
  },
  Hindi: {
    dashboardTitle: 'किसान डैशबोर्ड',
    dashboardSub: 'एआई-संचालित सटीक कृषि अंतर्दृष्टि',
    generateReport: 'रिपोर्ट तैयार करें',
    cropHealth: 'फसल स्वास्थ्य',
    pestRisk: 'कीट जोखिम',
    nutrientStatus: 'पोषक तत्व स्थिति',
    yieldForecast: 'उपज पूर्वानुमान',
    excellent: 'उत्कृष्ट',
    low: 'कम',
    optimal: 'इष्टतम',
    stable: 'स्थिर',
    estimated: 'अनुमानित',
    noDisease: 'कोई बीमारी नहीं मिली',
    minimalActivity: 'न्यूनतम गतिविधि',
    nitrogenHigh: 'नाइट्रोजन: उच्च',
    targetYield: 'लक्ष्य: 4.2t/ha',
    fieldMap: 'खेत स्वास्थ्य मानचित्र',
    mapOptimal: 'इष्टतम',
    mapWarning: 'चेतावनी',
    aiVerified: 'एआई सत्यापित: सेक्टर B-12 में नाइट्रोजन की कमी के शुरुआती संकेत दिख रहे हैं।',
    recentActions: 'हालिया एआई क्रियाएं',
    actionYield: 'साप्ताहिक उपज रिपोर्ट तैयार की गई',
    actionOptimize: 'सेक्टर A के लिए सिंचाई निर्धारित',
    actionAnalyze: 'मिट्टी के नमूनों का विश्लेषण पूरा हो गया',
    viewHistory: 'पूरा इतिहास देखें',
    searchPlaceholder: 'खेत, रिपोर्ट, अलर्ट खोजें...',
    notifications: 'सूचनाएं',
    markAllRead: 'सभी को पढ़ा हुआ मानें',
    viewAllNotif: 'सभी सूचनाएं देखें',
    aiPrefs: 'एआई प्राथमिकताएं',
    thresholdsLabel: 'चेतावनी सीमा',
    notificationsLabel: 'सूचनाएं',
    languageLabel: 'डैशबोर्ड भाषा',
    sensitivity: 'संवेदनशीलता',
    alerts: 'अलर्ट',
    farmManager: 'फार्म प्रबंधक',
    noNotif: 'अभी तक कोई सूचना नहीं है',
    profileTitle: 'उपयोगकर्ता प्रोफ़ाइल',
    assignedFields: 'सौपे गए खेत',
    activityHistory: 'गतिविधि इतिहास',
    usageMetrics: 'उपयोग मीट्रिक',
    totalArea: 'कुल क्षेत्र',
    sensorActive: 'सक्रिय सेंसर',
    reportsGenerated: 'तैयार रिपोर्ट',
    lastActive: 'पिछली बार सक्रिय',
    roleLabel: 'भूमिका',
    pestAnalysisTitle: 'एआई कीट विश्लेषण (CNN)',
    uploadImage: 'फसल की छवि अपलोड करें',
    scanning: 'पैटर्न स्कैनिंग...',
    riskLow: 'कम जोखिम',
    riskMedium: 'मध्यम जोखिम',
    riskHigh: 'उच्च जोखिम',
    pestDetected: 'कीट पैटर्न पाया गया',
    noPest: 'कोई कीट नहीं मिला',
    confidence: 'एआई विश्वास',
    nutrientN: 'नाइट्रोजन (N)',
    nutrientP: 'फास्फोरस (P)',
    nutrientK: 'पोटेशियम (K)',
    statusLow: 'कम',
    statusOptimal: 'इष्टतम',
    statusHigh: 'उच्च',
    yieldBasis: '5 साल के ऐतिहासिक डेटा पर आधारित',
    tonnesPerHectare: 'टन/हेक्टेयर',
    zoneHealth: 'क्षेत्र स्वास्थ्य',
    mapDanger: 'नाजुक'
  }
};

const mockDatabase = {
  fields: [
    { id: 1, type: 'field', name: 'North Sector A', crop: 'Corn', health: '94%', icon: <Wheat size={14} /> },
    { id: 2, type: 'field', name: 'East Sector B', crop: 'Wheat', health: '88%', icon: <Wheat size={14} /> },
    { id: 3, type: 'field', name: 'South Sector C', crop: 'Soybeans', health: '91%', icon: <Wheat size={14} /> }
  ],
  reports: [
    { id: 4, type: 'report', name: 'Weekly Yield Analysis', date: 'Jan 20, 2026', icon: <TrendingUp size={14} /> },
    { id: 5, type: 'report', name: 'Soil Nutrient Audit', date: 'Jan 18, 2026', icon: <FlaskConical size={14} /> },
    { id: 6, type: 'report', name: 'Pest Activity Report', date: 'Jan 15, 2026', icon: <Bug size={14} /> }
  ],
  alerts: [
    { id: 7, type: 'alert', name: 'Irrigation Warning', detail: 'Low moisture in Sector B', icon: <Droplets size={14} /> },
    { id: 8, type: 'alert', name: 'Pest Detection', detail: 'Spider mites in Sector C', icon: <Bug size={14} /> }
  ],
  nutrients: [
    { id: 9, type: 'nutrient', name: 'Nitrogen Levels', detail: 'Sector A: High, Sector B: Low', icon: <FlaskConical size={14} /> }
  ],
  historicalYields: [
    { year: 2021, yield: 3.8 },
    { year: 2022, yield: 4.1 },
    { year: 2023, yield: 3.9 },
    { year: 2024, yield: 4.2 },
    { year: 2025, yield: 4.0 }
  ]
};

const Dashboard = ({ user, onLogout }) => {
  // Per-user settings state
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(`agri_settings_${user.email}`);
    return saved ? JSON.parse(saved) : {
      thresholds: { pest: 70, moisture: 30, nitrogen: 50 },
      notifications: { pest: true, nutrient: true, yield: true },
      language: 'English'
    };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(`agri_notifs_${user.email}`);
    if (saved) return JSON.parse(saved);

    return [
      { id: 1, type: 'pest', priority: 'high', message: 'High Pest Risk: Armyworms detected in Sector A', time: '2 mins ago', read: false },
      { id: 2, type: 'nutrient', priority: 'medium', message: 'Nutrient Deficiency: Low Phosphorous in Sector D', time: '1 hour ago', read: false },
      { id: 3, type: 'yield', priority: 'low', message: 'Yield Update: Forecast increased by 4% in North Plot', time: '3 hours ago', read: true },
    ];
  });

  const addNotification = (type, priority, message) => {
    const newNotif = {
      id: Date.now(),
      type,
      priority,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    const updated = [newNotif, ...notifications].slice(0, 50);
    setNotifications(updated);
    localStorage.setItem(`agri_notifs_${user.email}`, JSON.stringify(updated));
  };
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileManage, setShowProfileManage] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldData, setNewFieldData] = useState({ name: '', tag: 'Standard' });

  // Neural Network & Cache State
  const modelRef = useRef(null);
  const analysisCache = useRef({});
  const [isModelLoading, setIsModelLoading] = useState(false);

  // Persistent User Profile State (Central Control Layer)
  const [userProfileData, setUserProfileData] = useState(() => {
    const saved = localStorage.getItem(`agri_profile_${user.email}`);
    if (saved) return JSON.parse(saved);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: 'Farm Manager', // Roles: Farm Manager, Operator, Admin
      farmName: 'Green Valley Estates',
      location: 'California, US',
      farmAreaValue: 1240,
      farmUnit: 'Acres',
      profileImage: null,
      assignedFields: [
        { id: 'f1', name: 'North Sector A', tag: 'High Priority', linked: true },
        { id: 'f2', name: 'East Sector B', tag: 'Standard', linked: true },
        { id: 'f3', name: 'West Sector G', tag: 'Experimental', linked: true }
      ],
      permissions: {
        canControlIrrigation: true,
        canTuneSensitivity: true,
        canGenerateReports: true,
        isAdmin: false
      },
      metrics: {
        activeSensors: 842,
        reportsGenerated: 12,
        lastSync: new Date().toISOString()
      },
      activityHistory: [
        { id: 1, action: 'Authorized Sector A Irrigation', time: '10:15 AM today', type: 'system' },
        { id: 2, action: 'Modified Pest Sensitivity to 85%', time: 'Yesterday', type: 'manual' },
        { id: 3, action: 'Downloaded Weekly Yield Report', time: 'Jan 24, 2026', type: 'report' }
      ]
    };
  });

  const updateProfile = (newData) => {
    const updated = { ...userProfileData, ...newData };
    updated.metrics.lastSync = new Date().toISOString();
    setUserProfileData(updated);
    localStorage.setItem(`agri_profile_${user.email}`, JSON.stringify(updated));
  };

  const autoLogActivity = (actionText, type = 'system') => {
    const newActivity = {
      id: Date.now(),
      action: actionText,
      time: 'Just now',
      type: type
    };
    const updated = {
      ...userProfileData,
      activityHistory: [newActivity, ...userProfileData.activityHistory].slice(0, 20)
    };
    setUserProfileData(updated);
    localStorage.setItem(`agri_profile_${user.email}`, JSON.stringify(updated));
    addLog(actionText, type === 'report' ? 'success' : 'info');
  };

  const hasPermission = (perm) => {
    const rolePermissions = {
      'Admin': { all: true },
      'Farm Manager': { canGenerateReports: true, canTuneSensitivity: true, canControlIrrigation: true },
      'Operator': { canControlIrrigation: true }
    };
    const activePerms = rolePermissions[userProfileData.role] || {};
    return activePerms.all || activePerms[perm];
  };

  const [profileTab, setProfileTab] = useState('personal'); // personal, farm, permissions, fields

  const [pestAnalysis, setPestAnalysis] = useState({
    status: 'idle', // idle, preprocessing, scanning, completed
    risk: 12, // percentage
    pattern: null, // Displays as Pest Type
    confidence: 0,
    severity: 'Low',
    affectedArea: 0,
    affectedRegions: []
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        runPestAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamic AI Logging State
  const [aiLogs, setAiLogs] = useState([
    { id: 1, time: '10 min ago', text: translations[settings.language].actionOptimize, type: 'success' },
    { id: 2, time: '5 hours ago', text: translations[settings.language].actionAnalyze, type: 'info' },
    { id: 3, time: 'Yesterday', text: translations[settings.language].actionYield, type: 'info' },
  ]);

  const addLog = (text, type = 'info') => {
    const newLog = {
      id: Date.now(),
      time: 'Just now',
      text: text,
      type: type
    };
    setAiLogs(prev => [newLog, ...prev]);
  };

  const runPestAnalysis = async () => {
    if (!previewImage) return;

    // 1. Enter Preprocessing Phase
    setPestAnalysis({ ...pestAnalysis, status: 'preprocessing' });

    // Load Neural Engine if not active
    if (!modelRef.current) {
      setIsModelLoading(true);
      try {
        modelRef.current = await mobilenet.load();
      } catch (err) {
        console.error("TF Load Error:", err);
        setPestAnalysis({ ...pestAnalysis, status: 'idle' });
        setIsModelLoading(false);
        return;
      }
      setIsModelLoading(false);
    }

    // 0. Fingerprint check for deterministic caching
    const fingerprint = previewImage.substring(previewImage.length - 100); // Unique-ish suffix for caching
    if (analysisCache.current[fingerprint]) {
      const cached = analysisCache.current[fingerprint];
      setTimeout(() => {
        setPestAnalysis({ ...cached, status: 'completed' });
        addLog(`Cache Hit: Retrieved deterministic result for existing image.`, 'success');
      }, 800);
      return;
    }

    setTimeout(() => {
      // 2. Transition to Neural Network Scanning
      setPestAnalysis(prev => ({ ...prev, status: 'scanning' }));

      const img = new Image();
      img.src = previewImage;
      img.onload = async () => {
        // --- STANDARDIZED PREPROCESSING ---
        let predictions = [];

        // Apply fixed Resizing (224x224), Normalization [0, 1], and Color Formatting
        const standardizedTensor = tf.tidy(() => {
          return tf.browser.fromPixels(img)
            .resizeBilinear([224, 224])
            .toFloat()
            .div(tf.scalar(255));
        });

        try {
          // Pass the pre-processed tensor directly to ensure consistent results
          predictions = await modelRef.current.classify(standardizedTensor);
          standardizedTensor.dispose();
        } catch (err) {
          console.error("Standardized Inference Error:", err);
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);

        const imgData = ctx.getImageData(0, 0, 100, 100).data;
        let stressScore = 0;
        let plantPixels = 0;

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i], g = imgData[i + 1], b = imgData[i + 2];
          if (g > b && g > r * 0.7) plantPixels++;
          if (r > g * 0.85 && r > 90) stressScore++;
        }

        const plantDensity = (plantPixels / 10000) * 100;
        const topResult = predictions[0] || { className: 'Unknown Object', probability: 0 };

        // AI Verification Logic
        const isVerifiedCrop = plantDensity > 15 ||
          topResult.className.toLowerCase().includes('leaf') ||
          topResult.className.toLowerCase().includes('plant');

        if (!isVerifiedCrop) {
          setPestAnalysis({
            status: 'completed',
            risk: 0,
            pattern: `Incompatible Subject: ${topResult.className}`,
            confidence: Math.round(topResult.probability * 100),
            level: 'low',
            affectedRegions: []
          });
          addLog(`Neural Reject: Subject identified as "${topResult.className}"`, 'warning');
          return;
        }

        // --- DETERMINISTIC THRESHOLD MAPPING ---
        const affectedAreaPercent = Math.min(100, Math.round((stressScore / Math.max(1, plantPixels)) * 100));
        const confScore = Math.round(topResult.probability * 100);

        // Severity mapping based on fixed confidence thresholds
        let severity = "Low";
        if (confScore > 80) severity = "High";
        else if (confScore >= 50) severity = "Medium";

        let riskFactor = confScore; // Risk directly proportional to neural confidence
        let agClass = "Healthy: Optimal Surface";

        const label = topResult.className.toLowerCase();
        const isInsect = label.includes('beetle') || label.includes('bug') || label.includes('insect') || label.includes('fly');

        // Deterministic classification based on combined neural + pixel signals
        if (severity === "High" || affectedAreaPercent > 40) {
          agClass = isInsect ? `Pest Infestation: ${topResult.className.split(',')[0]}` : "Severe Physiological Stress";
        } else if (severity === "Medium" || affectedAreaPercent > 10) {
          agClass = isInsect ? `Detected Activity: ${topResult.className.split(',')[0]}` : "Minor Stress Pattern";
        }

        const regions = riskFactor > 15
          ? [...fieldZones].sort((a, b) => a.coordinate.localeCompare(b.coordinate))
            .slice(0, Math.max(1, Math.floor(affectedAreaPercent / 8)))
            .map(z => z.coordinate)
          : [];

        setTimeout(() => {
          const finalResult = {
            risk: riskFactor,
            pattern: agClass,
            confidence: confScore,
            severity: severity,
            affectedArea: affectedAreaPercent,
            level: severity.toLowerCase(),
            affectedRegions: regions
          };

          // Cache for future deterministic retrieval
          analysisCache.current[fingerprint] = finalResult;

          setPestAnalysis({
            ...finalResult,
            status: 'completed'
          });

          // Integrated Real-Time Notification for AI Detection
          if (finalResult.risk > settings.thresholds.pest) {
            addNotification(
              'pest',
              finalResult.risk > 80 ? 'high' : 'medium',
              `AI Detection: ${finalResult.pattern} (${finalResult.confidence}% confidence) identified in scanning workflow.`
            );
          }

          if (regions.length > 0) {
            setFieldZones(prev => prev.map(zone => {
              if (regions.includes(zone.coordinate)) {
                const healthDrop = riskFactor > 50 ? 25 : 12;
                const newHealth = Math.max(5, zone.health - healthDrop);
                // Scale NDVI proportionally to health drop (e.g. if health drops by 20%, NDVI drops by ~15%)
                const ndviDrop = (healthDrop / 100) * 0.8;
                const newNDVI = Math.max(0.1, zone.ndvi - ndviDrop);

                return { ...zone, health: newHealth, ndvi: newNDVI };
              }
              return zone;
            }));
          }

          addLog(`Neural Evaluation Complete: ${agClass} [Conf: ${confScore}%]`, severity === 'High' ? 'warning' : 'success');
        }, 1500);
      };
    }, 1500);
  };

  // Mock Telemetry Data for Health Calculation (Vegetation Indices & Classification)
  const [telemetryData] = useState({
    ndvi: 0.88, // Normalized Difference Vegetation Index
    evic: 0.82, // Enhanced Vegetation Index
    diseaseDetections: notifications.filter(n => n.type === 'pest' && !n.read).length,
    moistureLevel: 42,
    leafChlorophyll: 45, // SPAD units equivalent
    spectralReflectance: {
      red: 0.05,
      nir: 0.45,
      green: 0.12
    }
  });

  const getNutrientStatus = () => {
    // Determine status based on chlorophyll (proxy for N) and reflectance indices
    const nStatus = telemetryData.leafChlorophyll > 40 ? 'statusOptimal' : telemetryData.leafChlorophyll > 25 ? 'statusLow' : 'statusLow';

    // Simulating Phosphorus/Potassium based on Green/NIR ratios (standard remote sensing proxies)
    const pIndex = telemetryData.spectralReflectance.nir / (telemetryData.spectralReflectance.green * 10);
    const pStatus = pIndex > 0.4 ? 'statusOptimal' : 'statusLow';

    const kStatus = telemetryData.moistureLevel > 35 ? 'statusOptimal' : 'statusLow';

    return {
      n: nStatus,
      p: pStatus,
      k: kStatus,
      overall: (nStatus === 'statusOptimal' && pStatus === 'statusOptimal') ? 'statusOptimal' : 'statusLow'
    };
  };

  const calculateHealthScore = () => {
    if (!fieldZones || fieldZones.length === 0) return 92;
    const totalHealth = fieldZones.reduce((acc, zone) => acc + zone.health, 0);
    return Math.round(totalHealth / fieldZones.length);
  };

  const calculateGlobalNDVI = () => {
    if (!fieldZones || fieldZones.length === 0) return 0.88;
    const totalNDVI = fieldZones.reduce((acc, zone) => acc + (zone.ndvi || 0.85), 0);
    return (totalNDVI / fieldZones.length).toFixed(2);
  };

  const getZoneClassification = (health) => {
    if (health >= 85) return { label: translations[settings.language].mapOptimal, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
    if (health >= 60) return { label: translations[settings.language].mapWarning, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
    return { label: translations[settings.language].mapDanger, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' };
  };

  const calculateYieldPrediction = () => {
    // Regression Simulation Logic:
    // 1. Get average historical yield
    const avgHistorical = mockDatabase.historicalYields.reduce((acc, curr) => acc + curr.yield, 0) / mockDatabase.historicalYields.length;

    // 2. Apply multipliers based on current AI metrics
    const healthMultiplier = calculateHealthScore() / 90; // Normalizing against 90% as "standard excellent"
    const pestPenalty = (pestAnalysis.risk / 100) * 0.15; // Max 15% reduction for pest
    const nutrientMultiplier = getNutrientStatus().overall === 'statusOptimal' ? 1.05 : 0.9; // +5% for optimal, -10% for low

    // 3. Predicted Result (Influenced by Profile Area)
    const baseAcreage = userProfileData.farmAreaValue || 1000;
    const predictedPerHa = avgHistorical * healthMultiplier * (1 - pestPenalty) * nutrientMultiplier;
    const totalPredictedYield = predictedPerHa * (baseAcreage / 2.471); // Convert acres to ha if necessary

    const percentageChange = ((predictedPerHa - avgHistorical) / avgHistorical) * 100;

    return {
      value: predictedPerHa.toFixed(1),
      totalValue: Math.round(totalPredictedYield),
      change: (percentageChange > 0 ? '+' : '') + percentageChange.toFixed(0) + '%',
      basis: translations[settings.language].yieldBasis
    };
  };

  // Grid-based zones state with dynamic metric computation
  const [fieldZones, setFieldZones] = useState(() => {
    const rows = 6;
    const cols = 10;
    return Array.from({ length: rows * cols }).map((_, i) => {
      const colIdx = i % cols;
      const rowIdx = Math.floor(i / cols);
      const coord = `${String.fromCharCode(65 + colIdx)}${rowIdx + 1}`;

      // Initial synthetic data with some variance
      const baseNDVI = 0.7 + (Math.random() * 0.2);
      const nutrientStability = 0.8 + (Math.random() * 0.2);
      const isStressed = i === 12 || i === 34 || i === 45;

      const health = isStressed ? 45 : Math.floor(80 + Math.random() * 20);

      return {
        id: i,
        coordinate: coord,
        health,
        ndvi: baseNDVI,
        nitrogen: nutrientStability,
        pestRisk: isStressed ? 0.6 : 0.1,
        status: isStressed ? 'Critical' : 'Optimal'
      };
    });
  });


  const generateDetailedReport = () => {
    const health = calculateHealthScore();
    const nutrients = getNutrientStatus();
    const yieldForecast = calculateYieldPrediction();
    const lang = settings.language;

    const timestamp = new Date().toLocaleString();
    const area = userProfileData.farmAreaValue;
    const unit = userProfileData.farmUnit;

    let content = `
    =========================================
    AGRIGUARD AI - CROP ANALYSIS REPORT
    =========================================
    Generated on: ${timestamp}
    Farm: ${userProfileData.farmName}
    Location: ${userProfileData.location}
    Manager: ${userProfileData.firstName} ${userProfileData.lastName} [${userProfileData.role}]
    Total Area: ${area} ${unit}
    
    1. CROP HEALTH SUMMARY
    -----------------------------------------
    Health Score: ${health}%
    Status: ${health > 90 ? 'Excellent' : health > 75 ? 'Good' : 'Needs Attention'}
    NDVI Index: ${calculateGlobalNDVI()}
    EVIC Index: ${telemetryData.evic}
    
    2. PEST DETECTION ANALYSIS (CNN)
    -----------------------------------------
    Overall Pest Risk: ${pestAnalysis.risk}%
    Detected Pattern: ${pestAnalysis.pattern || 'None detected'}
    AI Confidence: ${pestAnalysis.confidence}%
    Active Issues: ${telemetryData.diseaseDetections}
    
    3. SPECTRAL NUTRIENT STATUS
    -----------------------------------------
    Nitrogen (N): ${translations[lang][nutrients.n]}
    Phosphorus (P): ${translations[lang][nutrients.p]}
    Potassium (K): ${translations[lang][nutrients.k]}
    Overall Nutrient Balance: ${translations[lang][nutrients.overall]}
    
    4. YIELD PROJECTION (TIME-SERIES)
    -----------------------------------------
    Predicted Yield: ${yieldForecast.value} tonnes/ha
    Trend vs 5yr Avg: ${yieldForecast.change}
    Basis: ${yieldForecast.basis}
    
    5. FIELD GRID STATUS (TOP ZONES)
    -----------------------------------------
    Zone A1 Health: ${fieldZones.find(z => z.coordinate === 'A1')?.health}%
    Zone B4 Health: ${fieldZones.find(z => z.coordinate === 'B4')?.health}%
    Zone J6 Health: ${fieldZones.find(z => z.coordinate === 'J6')?.health}%
    
    =========================================
    END OF REPORT - (c) AgriGuard AI 2026
    =========================================
    `;

    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `AgriGuard_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    addLog(translations[lang].actionYield, 'success');

    // Update Profile Stats on successful report generation
    updateProfile({
      metrics: {
        ...userProfileData.metrics,
        reportsGenerated: (userProfileData.metrics.reportsGenerated || 0) + 1
      }
    });
    autoLogActivity(`Detailed Report Generated for ${userProfileData.farmName}`, 'report');
  };

  const notificationRef = useRef(null);
  const settingsRef = useRef(null);
  const profileRef = useRef(null);

  // Persistence for settings
  useEffect(() => {
    localStorage.setItem(`agri_settings_${user.email}`, JSON.stringify(settings));
  }, [settings, user.email]);

  // Mark all read
  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem(`agri_notifs_${user.email}`, JSON.stringify(updated));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem(`agri_notifs_${user.email}`, JSON.stringify([]));
  };

  // Mark single as read
  const markAsRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem(`agri_notifs_${user.email}`, JSON.stringify(updated));
  };

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simulate AI detections DYNAMICALLY based on settings
  useEffect(() => {
    const timer = setTimeout(() => {
      // Dynamic Alert Logic: only generate if notification is enabled and threshold is met (logic simulation)
      if (settings.notifications.pest) {
        const msg = settings.language === 'English'
          ? `🚨 CRITICAL: Pest infestation at ${settings.thresholds.pest}% risk in Sector B`
          : settings.language === 'Spanish'
            ? `🚨 CRÍTICO: Riesgo de infestación al ${settings.thresholds.pest}% en el Sector B`
            : settings.language === 'Hindi'
              ? `🚨 गंभीर: सेक्टर B में ${settings.thresholds.pest}% जोखिम पर कीट का प्रकोप`
              : `🚨 CRITIQUE: Risque d'infestation à ${settings.thresholds.pest}% dans le Secteur B`;

        addNotification('pest', 'high', msg);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [settings]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const allItems = [
      ...mockDatabase.fields,
      ...mockDatabase.reports,
      ...mockDatabase.alerts,
      ...mockDatabase.nutrients
    ];

    const filtered = allItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.crop && item.crop.toLowerCase().includes(query.toLowerCase())) ||
      (item.detail && item.detail.toLowerCase().includes(query.toLowerCase()))
    );

    setSearchResults(filtered);
  };

  return (
    <div className="dashboard-container">
      <nav className="dash-nav">
        <div className="nav-left">
          <div className="logo-icon-small">
            <Sprout size={20} />
          </div>
          <span className="brand-name">AgriGuard AI</span>
        </div>

        <div className="nav-center">
          <div className="search-bar" style={{ position: 'relative' }}>
            <Search size={16} />
            <input
              type="text"
              placeholder={translations[settings.language].searchPlaceholder}
              value={searchQuery}
              onChange={handleSearch}
              onBlur={() => setTimeout(() => setIsSearching(false), 200)}
              onFocus={() => searchQuery && setIsSearching(true)}
            />

            <AnimatePresence>
              {isSearching && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="search-results-dropdown"
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    zIndex: 100,
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '8px'
                  }}
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="search-result-item"
                        style={{
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          background: result.type === 'alert' ? '#fee2e2' : result.type === 'field' ? '#ecfdf5' : '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: result.type === 'alert' ? '#ef4444' : result.type === 'field' ? '#10b981' : '#64748b'
                        }}>
                          {result.icon}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{result.name}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            {result.type.charAt(0).toUpperCase() + result.type.slice(1)} {result.crop || result.detail || result.date}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="nav-right" ref={notificationRef}>
          <div style={{ position: 'relative' }}>
            <button
              className="icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ position: 'relative' }}
            >
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  minWidth: '18px',
                  height: '18px',
                  padding: '0 4px',
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '10px',
                  border: '2px solid white',
                  fontSize: '10px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {notifications.filter(n => !n.read).length}
                </div>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="notifications-dropdown"
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '320px',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    border: '1px solid #e2e8f0',
                    zIndex: 110,
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{translations[settings.language].notifications}</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={markAllRead}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Mark all read
                      </button>
                      <button
                        onClick={clearAllNotifications}
                        style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                  <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          style={{
                            padding: '16px',
                            borderBottom: '1px solid #f8fafc',
                            background: n.read ? 'transparent' : 'rgba(16, 185, 129, 0.03)',
                            display: 'flex',
                            gap: '12px',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#fefefe'}
                          onMouseLeave={(e) => e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(16, 185, 129, 0.03)'}
                        >
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: n.priority === 'high' ? '#fee2e2' : n.priority === 'medium' ? '#fef3c7' : '#ecfdf5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: n.priority === 'high' ? '#ef4444' : n.priority === 'medium' ? '#f59e0b' : '#10b981',
                            flexShrink: 0
                          }}>
                            {n.type === 'pest' ? <Bug size={18} /> : n.type === 'nutrient' ? <FlaskConical size={18} /> : <TrendingUp size={18} />}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.4', fontWeight: n.read ? 400 : 600, color: 'var(--text-main)' }}>{n.message}</p>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.time}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Bell size={24} style={{ opacity: 0.3, marginBottom: '8px' }} />
                        <p style={{ margin: 0, fontSize: '13px' }}>{translations[settings.language].noNotif}</p>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '12px', textAlign: 'center', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                    <span
                      onClick={() => alert('View All Notifications')}
                      style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      {translations[settings.language].viewAllNotif}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ position: 'relative' }} ref={settingsRef}>
            <button className="icon-btn" onClick={() => setShowSettings(!showSettings)}>
              <Settings size={20} />
            </button>

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="settings-dropdown"
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '350px',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    border: '1px solid #e2e8f0',
                    zIndex: 120,
                    padding: '20px'
                  }}
                >
                  <h4 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 700 }}>{translations[settings.language].aiPrefs}</h4>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>{translations[settings.language].thresholdsLabel}</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {Object.entries(settings.thresholds).map(([key, val]) => (
                        <div key={key}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '13px', textTransform: 'capitalize' }}>{key} {translations[settings.language].sensitivity}</span>
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{val}%</span>
                          </div>
                          <input
                            type="range"
                            min="1" max="100"
                            value={val}
                            disabled={!hasPermission('canTuneSensitivity')}
                            onChange={(e) => {
                              if (!hasPermission('canTuneSensitivity')) return;
                              setSettings({
                                ...settings,
                                thresholds: { ...settings.thresholds, [key]: parseInt(e.target.value) }
                              });
                            }}
                            onMouseUp={(e) => {
                              if (hasPermission('canTuneSensitivity')) {
                                autoLogActivity(`Sensitivity tuned: ${key} threshold set to ${e.target.value}%`, 'manual');
                              }
                            }}
                            style={{
                              width: '100%',
                              accentColor: hasPermission('canTuneSensitivity') ? 'var(--primary)' : '#94a3b8',
                              cursor: hasPermission('canTuneSensitivity') ? 'pointer' : 'not-allowed'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>{translations[settings.language].notificationsLabel}</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {Object.entries(settings.notifications).map(([key, enabled]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', textTransform: 'capitalize' }}>{key} {translations[settings.language].alerts}</span>
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, [key]: e.target.checked }
                            })}
                            style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>{translations[settings.language].languageLabel}</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="user-profile" ref={profileRef} style={{ position: 'relative' }}>
            <div
              className="user-avatar"
              onClick={() => setShowProfile(!showProfile)}
              style={{
                cursor: 'pointer',
                overflow: 'hidden',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {userProfileData.profileImage ? (
                <img src={userProfileData.profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={20} />
              )}
            </div>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="profile-modal"
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '380px',
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
                    border: '1px solid #e2e8f0',
                    zIndex: 150,
                    padding: '24px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      color: 'var(--primary)',
                      overflow: 'hidden',
                      border: '3px solid white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      {userProfileData.profileImage ? (
                        <img src={userProfileData.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <User size={40} />
                      )}
                    </div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{user.firstName} {user.lastName}</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>{user.email}</p>
                    <div style={{
                      display: 'inline-block',
                      marginTop: '12px',
                      padding: '4px 12px',
                      background: '#ecfdf5',
                      color: '#059669',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>
                      {translations[settings.language].roleLabel}: {userProfileData.role}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                      <Activity size={16} color="var(--primary)" style={{ marginBottom: '6px' }} />
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{translations[settings.language].sensorActive}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{userProfileData.metrics.activeSensors}</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                      <Map size={16} color="#3b82f6" style={{ marginBottom: '6px' }} />
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{translations[settings.language].totalArea}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{userProfileData.farmAreaValue} {userProfileData.farmUnit}</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                      <BarChart3 size={16} color="#8b5cf6" style={{ marginBottom: '6px' }} />
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{translations[settings.language].reportsGenerated}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{userProfileData.metrics.reportsGenerated || 0}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} color="var(--primary)" />
                      {translations[settings.language].assignedFields}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ padding: '4px 10px', background: '#f1f5f9', borderRadius: '6px', fontSize: '12px', color: 'var(--text-main)', fontWeight: 500 }}>
                        {userProfileData.assignedFields.length} {translations[settings.language].assignedFields}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowProfile(false);
                        setShowProfileManage(true);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Settings size={16} /> {translations[settings.language].editProfile}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="user-info">
              <span className="user-name">{userProfileData.firstName} {userProfileData.lastName}</span>
              <span className="user-role">{userProfileData.role}</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>


      <main className="dash-content">
        <header className="content-header">
          <div>
            <h1>{translations[settings.language].dashboardTitle}</h1>
            <p>{translations[settings.language].dashboardSub}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="primary-btn"
              style={{
                background: hasPermission('canControlIrrigation') ? '#3b82f6' : '#94a3b8',
                cursor: hasPermission('canControlIrrigation') ? 'pointer' : 'not-allowed'
              }}
              onClick={() => {
                if (!hasPermission('canControlIrrigation')) {
                  addLog('Role Error: You do not have permission to control irrigation.', 'warning');
                  return;
                }
                autoLogActivity(translations[settings.language].actionOptimize, 'system');
              }}
            >
              <Droplets size={18} /> {translations[settings.language].actionOptimize.split(' ')[0]}
            </button>
            <button
              className="primary-btn"
              style={{
                background: hasPermission('canGenerateReports') ? 'var(--primary)' : '#94a3b8',
                cursor: hasPermission('canGenerateReports') ? 'pointer' : 'not-allowed'
              }}
              onClick={() => {
                if (!hasPermission('canGenerateReports')) {
                  addLog('Role Error: Permission denied for report generation.', 'warning');
                  return;
                }
                generateDetailedReport();
              }}
            >
              <LayoutDashboard size={18} /> {translations[settings.language].generateReport}
            </button>
          </div>
        </header>

        <div className="stats-grid">
          {[
            {
              label: translations[settings.language].cropHealth,
              value: `${calculateHealthScore()}%`,
              icon: <Leaf />,
              color: '#10b981',
              trend: `NDVI: ${calculateGlobalNDVI()}`,
              sub: telemetryData.diseaseDetections > 0 ? `${telemetryData.diseaseDetections} issues detected` : translations[settings.language].noDisease
            },
            {
              label: translations[settings.language].pestRisk,
              value: pestAnalysis.status === 'completed'
                ? (pestAnalysis.risk > 70 ? translations[settings.language].riskHigh : pestAnalysis.risk > 30 ? translations[settings.language].riskMedium : translations[settings.language].riskLow)
                : translations[settings.language].low,
              icon: <Bug />,
              color: '#f59e0b',
              trend: `${pestAnalysis.risk}%`,
              sub: pestAnalysis.pattern || translations[settings.language].minimalActivity
            },
            {
              label: translations[settings.language].nutrientStatus,
              value: translations[settings.language][getNutrientStatus().overall],
              icon: <FlaskConical />,
              color: '#3b82f6',
              trend: translations[settings.language].stable,
              sub: (
                <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                  <span title="Nitrogen" style={{ color: getNutrientStatus().n === 'statusOptimal' ? '#10b981' : '#f59e0b' }}>N</span>
                  <span title="Phosphorus" style={{ color: getNutrientStatus().p === 'statusOptimal' ? '#10b981' : '#f59e0b' }}>P</span>
                  <span title="Potassium" style={{ color: getNutrientStatus().k === 'statusOptimal' ? '#10b981' : '#f59e0b' }}>K</span>
                </div>
              )
            },
            {
              label: translations[settings.language].yieldForecast,
              value: `${calculateYieldPrediction().value} ${translations[settings.language].tonnesPerHectare}`,
              icon: <TrendingUp />,
              color: '#8b5cf6',
              trend: calculateYieldPrediction().change,
              sub: `Est. Total: ${calculateYieldPrediction().totalValue} tonnes (${userProfileData.farmAreaValue} ${userProfileData.farmUnit})`
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card"
            >
              <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-details">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-row">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-trend" style={{ color: stat.trend.includes('+') ? '#10b981' : stat.trend.includes('-') ? '#ef4444' : '#6b7280', background: 'none', padding: 0 }}>
                    {stat.trend}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{stat.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="charts-row">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="chart-card"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>{translations[settings.language].fieldMap}</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '2px', background: '#ef4444' }}></div> {translations[settings.language].mapDanger}
                </span>
                <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '2px', background: '#f59e0b' }}></div> {translations[settings.language].mapWarning}
                </span>
                <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '2px', background: '#10b981' }}></div> {translations[settings.language].mapOptimal}
                </span>
              </div>
            </div>
            <div className="field-map-sim" style={{
              height: '300px',
              background: '#f8fafc',
              borderRadius: '12px',
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gridTemplateRows: 'repeat(6, 1fr)',
              gap: '4px',
              padding: '12px',
              border: '1px solid #e2e8f0'
            }}>
              {fieldZones.map((zone) => {
                const classification = getZoneClassification(zone.health);
                return (
                  <motion.div
                    key={zone.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: zone.id * 0.005 }}
                    style={{
                      background: classification.color,
                      borderRadius: '4px',
                      position: 'relative',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                    whileHover={{ scale: 1.15, zIndex: 10, cursor: 'crosshair', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  >
                    <div className="zone-tooltip" style={{
                      position: 'absolute',
                      bottom: '120%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(15, 23, 42, 0.95)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '10px',
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      zIndex: 100,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Zone {zone.coordinate}</span>
                        <span style={{ padding: '1px 4px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', fontSize: '8px' }}>{classification.label}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div>
                          <div style={{ opacity: 0.7, fontSize: '9px' }}>Health Score</div>
                          <div style={{ fontWeight: 600 }}>{zone.health}%</div>
                        </div>
                        <div>
                          <div style={{ opacity: 0.7, fontSize: '9px' }}>NDVI Index</div>
                          <div style={{ fontWeight: 600 }}>{zone.ndvi?.toFixed(2) || '0.85'}</div>
                        </div>
                      </div>
                    </div>
                    <style>
                      {`div:hover > .zone-tooltip { opacity: 1; }`}
                    </style>
                  </motion.div>
                );
              })}
            </div>
            <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={14} color="#10b981" />
              {translations[settings.language].aiVerified}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="info-card"
          >
            <h3>{translations[settings.language].recentActions}</h3>
            <div className="action-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {aiLogs.slice(0, 5).map((action) => (
                <div key={action.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: action.type === 'success' ? '#10b981' : action.type === 'warning' ? '#ef4444' : '#3b82f6',
                    marginTop: '4px',
                    boxShadow: `0 0 8px ${action.type === 'success' ? '#10b98160' : action.type === 'warning' ? '#ef444460' : '#3b82f660'}`
                  }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{action.text}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{action.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowHistoryModal(true)}
              style={{
                width: '100%',
                marginTop: '16px', // Slightly reduced margin for better spacing
                padding: '12px',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#f8fafc'}
              onMouseOut={(e) => e.target.style.background = 'white'}
            >
              {translations[settings.language].viewHistory}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="chart-card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={20} color="var(--primary)" />
                {translations[settings.language].pestAnalysisTitle}
              </h3>
              {pestAnalysis.status === 'completed' && (
                <div style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: pestAnalysis.risk > 70 ? '#fee2e2' : pestAnalysis.risk > 30 ? '#fef3c7' : '#ecfdf5',
                  color: pestAnalysis.risk > 70 ? '#ef4444' : pestAnalysis.risk > 30 ? '#d97706' : '#10b981',
                }}>
                  {pestAnalysis.risk > 70 ? translations[settings.language].riskHigh : pestAnalysis.risk > 30 ? translations[settings.language].riskMedium : translations[settings.language].riskLow}
                </div>
              )}
            </div>

            <div style={{
              height: '240px',
              border: '2px dashed #e2e8f0',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8fafc',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {pestAnalysis.status === 'idle' ? (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Upload size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="primary-btn"
                    style={{ padding: '8px 24px' }}
                  >
                    {translations[settings.language].uploadImage}
                  </button>
                </>
              ) : pestAnalysis.status === 'scanning' ? (
                <div style={{ textAlign: 'center' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    style={{ marginBottom: '16px' }}
                  >
                    <Zap size={48} color="var(--primary)" />
                  </motion.div>
                  <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{translations[settings.language].scanning}</p>
                </div>
              ) : (
                <div style={{ width: '100%', padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      background: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      border: '1px solid #e2e8f0'
                    }}>
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Bug size={32} color={pestAnalysis.risk > 30 ? "#ef4444" : "#94a3b8"} />
                      )}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {translations[settings.language].pestTypeLabel}
                      </h4>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
                        {pestAnalysis.pattern || translations[settings.language].noPest}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{translations[settings.language].confidence}</div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>{pestAnalysis.confidence}%</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{translations[settings.language].severityLabel}</div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: pestAnalysis.risk > 70 ? '#ef4444' : pestAnalysis.risk > 30 ? '#f59e0b' : '#10b981' }}>
                        {pestAnalysis.severity}
                      </div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{translations[settings.language].affectedAreaLabel}</div>
                      <div style={{ fontSize: '15px', fontWeight: 700 }}>{pestAnalysis.affectedArea}%</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setPestAnalysis({ ...pestAnalysis, status: 'idle' })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Analyze Another Image
                  </button>
                </div>
              )}

              {/* Advanced Preprocessing Overlay */}
              {pestAnalysis.status === 'preprocessing' && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ marginBottom: '12px' }}
                  >
                    <Settings size={40} color="var(--primary)" className="spin" />
                  </motion.div>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>{translations[settings.language].preprocessing}</p>
                </div>
              )}
            </div>

            <p style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Powered by ResNet-50 Pattern Recognition
            </p>
          </motion.div>
        </div>
      </main>

      {/* Full History Modal */}
      <AnimatePresence>
        {showHistoryModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                background: 'white',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{translations[settings.language].recentActions}</h3>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}
                >
                  <ChevronRight size={18} style={{ transform: 'rotate(90deg)' }} />
                </button>
              </div>

              <div style={{ padding: '24px', maxHeight: '60vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {aiLogs.map((action) => (
                    <div key={action.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: action.type === 'success' ? '#10b981' : action.type === 'warning' ? '#ef4444' : '#3b82f6',
                        marginTop: '4px',
                        boxShadow: `0 0 10px ${action.type === 'success' ? '#10b98140' : action.type === 'warning' ? '#ef444440' : '#3b82f640'}`
                      }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>{action.text}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
                          <Clock size={12} />
                          {action.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '16px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{aiLogs.length} total actions recorded</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Profile Management Modal */}
      <AnimatePresence>
        {showProfileManage && (
          <div
            onClick={() => setShowProfileManage(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              padding: '20px'
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                background: 'white',
                width: '100%',
                maxWidth: '800px',
                borderRadius: '24px',
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.3)',
                display: 'grid',
                gridTemplateColumns: '280px 1fr',
                overflow: 'hidden'
              }}
            >
              <div style={{ background: '#f8fafc', padding: '32px', borderRight: '1px solid #e2e8f0' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '40px',
                    overflow: 'hidden',
                    border: '4px solid white',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }}>
                    {userProfileData.profileImage ? (
                      <img src={userProfileData.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      userProfileData.firstName?.charAt(0)
                    )}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{userProfileData.firstName} {userProfileData.lastName}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{userProfileData.role}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'personal', label: translations[settings.language].personalInfo, icon: <User size={18} /> },
                    { id: 'farm', label: translations[settings.language].farmDetails, icon: <Wheat size={18} /> },
                    { id: 'fields', label: translations[settings.language].assignedFieldsLabel, icon: <Map size={18} /> },
                    { id: 'permissions', label: translations[settings.language].rolePermissions, icon: <ShieldCheck size={18} /> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setProfileTab(tab.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: 'none',
                        background: profileTab === tab.id ? 'var(--primary-light)' : 'transparent',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: profileTab === tab.id ? 'var(--primary)' : 'var(--text-main)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: '40px', maxHeight: '80vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h2 style={{ margin: 0 }}>{translations[settings.language].profileTitle}</h2>
                  <button onClick={() => setShowProfileManage(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <LogOut size={24} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '24px' }}>
                  {profileTab === 'personal' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                        {translations[settings.language].personalInfo}
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <input
                          type="text"
                          value={userProfileData.firstName}
                          onChange={(e) => updateProfile({ firstName: e.target.value })}
                          placeholder="First Name"
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}
                        />
                        <input
                          type="text"
                          value={userProfileData.lastName}
                          onChange={(e) => updateProfile({ lastName: e.target.value })}
                          placeholder="Last Name"
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}
                        />
                      </div>
                      <div style={{ display: 'grid', gap: '16px' }}>
                        <input
                          type="email"
                          value={userProfileData.email}
                          disabled
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', background: '#f1f5f9' }}
                        />
                        <select
                          value={userProfileData.role}
                          onChange={(e) => updateProfile({ role: e.target.value })}
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}
                        >
                          <option>Farm Manager</option>
                          <option>Operator</option>
                          <option>Admin</option>
                        </select>
                      </div>

                      <div style={{ marginTop: '24px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>
                          Profile Picture
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f1f5f9', overflow: 'hidden' }}>
                            {userProfileData.profileImage ? (
                              <img src={userProfileData.profileImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                <User size={32} />
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (re) => updateProfile({ profileImage: re.target.result });
                                  reader.readAsDataURL(file);
                                }
                              };
                              input.click();
                            }}
                            style={{
                              padding: '10px 20px',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0',
                              background: 'white',
                              fontSize: '13px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Upload New Photo
                          </button>
                          {userProfileData.profileImage && (
                            <button
                              onClick={() => updateProfile({ profileImage: null })}
                              style={{ color: '#ef4444', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer' }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {profileTab === 'farm' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                        {translations[settings.language].farmDetails}
                      </label>
                      <div style={{ display: 'grid', gap: '16px' }}>
                        <input
                          type="text"
                          value={userProfileData.farmName}
                          onChange={(e) => updateProfile({ farmName: e.target.value })}
                          placeholder={translations[settings.language].farmName}
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                          <input
                            type="text"
                            value={userProfileData.location}
                            onChange={(e) => updateProfile({ location: e.target.value })}
                            placeholder={translations[settings.language].farmLocation}
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}
                          />
                          <input
                            type="number"
                            value={userProfileData.farmAreaValue}
                            onChange={(e) => updateProfile({ farmAreaValue: parseFloat(e.target.value) || 0 })}
                            placeholder="Area"
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}
                          />
                          <select
                            value={userProfileData.farmUnit}
                            onChange={(e) => updateProfile({ farmUnit: e.target.value })}
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}
                          >
                            <option>Acres</option>
                            <option>Hectares</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {profileTab === 'fields' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Manage Assets ({userProfileData.assignedFields.length})
                        </label>
                        <button
                          onClick={() => setShowAddField(true)}
                          style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                        >
                          + Add Field
                        </button>
                      </div>

                      <AnimatePresence>
                        {showAddField && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{
                              background: '#f1f5f9',
                              padding: '16px',
                              borderRadius: '12px',
                              marginBottom: '16px',
                              border: '1px dashed var(--primary)'
                            }}
                          >
                            <h5 style={{ margin: '0 0 12px 0', fontSize: '13px' }}>Asset Registration</h5>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                              <input
                                type="text"
                                placeholder="Field Name"
                                value={newFieldData.name}
                                onChange={(e) => setNewFieldData({ ...newFieldData, name: e.target.value })}
                                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px' }}
                              />
                              <select
                                value={newFieldData.tag}
                                onChange={(e) => setNewFieldData({ ...newFieldData, tag: e.target.value })}
                                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px' }}
                              >
                                <option>Standard</option>
                                <option>High Priority</option>
                                <option>Experimental</option>
                                <option>Resting</option>
                              </select>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setShowAddField(false)}
                                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', fontSize: '12px', cursor: 'pointer' }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  if (!newFieldData.name) return;
                                  const newFields = [...userProfileData.assignedFields, {
                                    id: Date.now(),
                                    ...newFieldData,
                                    linked: true
                                  }];
                                  updateProfile({ assignedFields: newFields });
                                  autoLogActivity(`New database entry: Field "${newFieldData.name}" created.`, 'system');
                                  setNewFieldData({ name: '', tag: 'Standard' });
                                  setShowAddField(false);
                                }}
                                style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: 'var(--primary)', color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                              >
                                Save Asset
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {userProfileData.assignedFields.map(field => (
                          <div key={field.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 600 }}>{field.name}</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tag: {field.tag} • Linked: {field.linked ? 'Yes' : 'No'}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => {
                                  const newName = prompt("New Name:", field.name);
                                  if (newName) {
                                    const updatedFields = userProfileData.assignedFields.map(f =>
                                      f.id === field.id ? { ...f, name: newName } : f
                                    );
                                    updateProfile({ assignedFields: updatedFields });
                                    autoLogActivity(`Field asset renamed: ${field.name} -> ${newName}`, 'system');
                                  }
                                }}
                                style={{ background: '#f1f5f9', color: '#64748b', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                                title="Rename Field"
                              >
                                <Settings size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  const filtered = userProfileData.assignedFields.filter(f => f.id !== field.id);
                                  updateProfile({ assignedFields: filtered });
                                  autoLogActivity(`Field asset "${field.name}" removed from profile.`, 'system');
                                }}
                                style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                              >
                                <LogOut size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {profileTab === 'permissions' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                        {translations[settings.language].permissionsLabel}
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(userProfileData.permissions).map(([key, enabled]) => (
                          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                            <span style={{ fontSize: '14px', textTransform: 'capitalize', fontWeight: 600 }}>{key.replace(/([A-Z])/g, ' $1')}</span>
                            <input
                              type="checkbox"
                              checked={enabled}
                              disabled={userProfileData.role !== 'Admin'}
                              onChange={(e) => updateProfile({ permissions: { ...userProfileData.permissions, [key]: e.target.checked } })}
                              style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: userProfileData.role === 'Admin' ? 'pointer' : 'not-allowed' }}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                <div style={{ marginTop: '40px', pt: '24px', borderTop: '1px solid #f1f5f9' }}>
                  <button
                    onClick={() => setShowProfileManage(false)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '16px',
                      cursor: 'pointer',
                      boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)'
                    }}
                  >
                    {translations[settings.language].saveProfile}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('agri_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('agri_user', JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const handleSignup = (formData) => {
    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    if (users.some(u => u.email === formData.email)) {
      return { success: false, message: 'Email already exists' };
    }

    const newUser = { ...formData };
    users.push(newUser);
    localStorage.setItem('agri_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('agri_user', JSON.stringify(newUser));
    return { success: true };
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('agri_user');
  };

  if (loading) return null;

  return (
    <div className="app-main">
      <AnimatePresence mode="wait">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <div className="auth-wrapper">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <LoginPage key="login" onToggle={() => setIsLogin(false)} onLogin={handleLogin} />
              ) : (
                <SignupPage key="signup" onToggle={() => setIsLogin(true)} onSignup={handleSignup} />
              )}
            </AnimatePresence>

            {/* Decorative Brand Badge */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              color: 'white',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: 0.8
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em' }}>AI PRECISION FARMING v2.0</span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

