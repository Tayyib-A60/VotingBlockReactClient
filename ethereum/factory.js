import web3 from './web3';
import CreateElection from './build/CreateElection.json';

const instance = new web3.eth.Contract(
    JSON.parse(CreateElection.interface),
    '0x333e1e889aaf46df893b88cd5ca031061d652548'
);

export default instance;