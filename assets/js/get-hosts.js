import C from '../../constants';

export default (target, env) => {
    return C.hosts[target][env];
};