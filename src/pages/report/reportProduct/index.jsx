import ReportProductCategory from './reportProductCategory';
import ReportProductDiscount from './reportProductDiscount';
import ReportProductStock from './reportProductStock30';
import ReportProductSupplier from './reportProductSupplier';

const ReportProduct = () => {
    
return (
  <div>
    <ReportProductDiscount/> 
    <ReportProductCategory/>
    <ReportProductSupplier/> 
    <ReportProductStock/>

  </div>
  );
};

export default ReportProduct;