import Axios from "axios";

// the base url on local machine will be and on server it will be. To make it dynamic you can make the baseURL `${window.localhost.protocol}://${window.location.hostname}:8103` , here window.location.hostname retruns the domain of the site so, on local machine: localhost and on server: finemate.co
export default Axios.create({baseURL: 'http://127.0.0.1:8103'});