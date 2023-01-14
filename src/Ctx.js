import React from "react";

export default React.createContext({
    user: {},
    token: "",
    api: {},
    setUser: () => {},
    setToken: () => {},
    setApi: () => {},
    modalActive: false,
    setmodalActive: () => {},
    goods: [],
    setGoods: () => {},
    visibleGoods: [],
    setVisibleGoods: () => {}
});