import request from '../utils/request';

export const fetchData1 = query => {
    return request({
        url: '/json/phySignal.json?t='+Math.random(),
        method: 'get',
        params: query
    });
};
export const fetchData2 = query => {
    return request({
        url: '/json/phyData.json?t='+Math.random(),
        method: 'get',
        params: query
    });
};


export const logicData1 = query => {
    return request({
        url: '/json/logicSignal.json?t='+Math.random(),
        method: 'get',
        params: query
    });
};

export const logicData2 = query => {
    return request({
        url: '/json/logicData.json?t='+Math.random(),
        method: 'get',
        params: query
    });
};
