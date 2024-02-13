import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerLicense } from '@syncfusion/ej2-base';

import App from './App.jsx'
import './index.css'

registerLicense('ORg4AjUWIQA/Gnt2UVhiQlVPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9nSXxSdERkXXlccXFRTmY=');

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
