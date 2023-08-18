import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';

// @ts-ignore
let Authorized = RenderAuthorize(getAuthority()); // Reload the rights component

const reloadAuthorized = () => {
  //@ts-ignore
  Authorized = RenderAuthorize(getAuthority());
};
/**
 * hard code
 * block need it。
 */
//@ts-ignore
window.reloadAuthorized = reloadAuthorized;
export { reloadAuthorized };
export default Authorized;
