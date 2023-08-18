import Authorized from './Authorized';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';
//@ts-ignore
Authorized.Secured = Secured;
//@ts-ignore
Authorized.check = check;
const RenderAuthorize = renderAuthorize(Authorized);
export default RenderAuthorize;
