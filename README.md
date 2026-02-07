#  AgriGuard AI: Precision Agriculture Reimagined

AgriGuard AI is a state-of-the-art precision agriculture dashboard designed for modern farm management. By combining **Computer Vision (CNN)**, **Real-time Telemetry**, and **Predictive Analytics**, AgriGuard empowers farmers to optimize yields, monitor crop health at the pixel level, and manage assets with scientific accuracy.


---

##  Core Features

### 1.  Precision Field Health Map
- **High-Granularity Grid**: The field is divided into 60 individual zones for localized monitoring.
- **Spectral Indices**: Real-time computation of **NDVI (Normalized Difference Vegetation Index)** and **EVI** to assess vegetation vigor.
- **Dynamic Heatmapping**: Color-coded zones (Optimal, Warning, Critical) that update instantly based on sensor data and AI analysis.

### 2.  AI-Powered Pest & Disease Analysis
- **On-Device Vision**: Uses **TensorFlow.js** and **MobileNet** to perform real-time image classification directly in the browser.
- **Risk Assessment**: Detects pest patterns and physiological stress with confidence scores.
- **Impact Propagation**: AI-detected issues automatically degrade the health scores and NDVI values of affected sectors on the field map.

### 3.  Intelligent Notification System
- **Real-time Sync**: Automated priority alerts (High, Medium, Low) triggered by AI detections.
- **Persistent Ledger**: Full notification history saved to local storage, ensuring you never miss a critical update.
- **Activity Logging**: Professional audit trail of all automated and manual system actions.

### 4.  Yield Forecasting & Analytics
- **Predictive Engine**: Combines 5-year historical data with current health metrics to forecast final harvest yields.
- **Nutrient Profiling**: Spectral analysis of Nitrogen (N), Phosphorus (P), and Potassium (K) levels.
- **Automated Reporting**: Generation of comprehensive text-based agriculture reports for offline audit.

### 5.  Advanced Profile & Asset Management
- **Custom Identity**: Personalized user profiles with integrated avatar uploads.
- **Field Asset Registry**: Manage multiple sectors with a custom-built registration and renaming interface.
- **Permissions-Based UI**: Role-based access control (Admin, Farm Manager, Operator) for critical irrigation and reporting modules.

---

##  Tech Stack

- **Frontend**: React 19 + Vite (Modern, fast, and responsive)
- **Intelligence**: TensorFlow.js (In-browser machine learning)
- **Styling**: Vanilla CSS with Glassmorphism and Mobile-First responsiveness
- **Animations**: Framer Motion (Smooth UI transitions and interactive map effects)
- **Charts**: Recharts (High-performance telemetry visualization)
- **Icons**: Lucide React (Clean, scalable agricultural iconography)

---

##  Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd agri-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```

4. **Access the platform**:
   Open your browser to `--------`

---

##  License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed for the Hyperspace Hackathon 2026**
*"Empowering the next generation of farmers with the power of AI."*