import ReportProductCategory from './reportProductCategory';
import ReportProductDiscount from './reportProductDiscount';
import ReportPriceDiscounted from './reportProductPriceDiscounted';
import ReportProductStock from './reportProductStock30';
import ReportProductSupplier from './reportProductSupplier';

const ReportProduct = () => {
    
return (
  <div>
    <ReportPriceDiscounted/>
    <ReportProductDiscount/> 
    <ReportProductCategory/>
    <ReportProductSupplier/> 
    <ReportProductStock/>

  </div>
  );
};

export default ReportProduct;