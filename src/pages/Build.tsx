import { Navigate } from "react-router-dom";

/**
 * The interactive builder now lives on the Plans page (it replaced the static
 * price cards). Keep /build as a permanent redirect so existing links don't 404.
 */
const Build = () => <Navigate to="/plans" replace />;

export default Build;
