import { getRequest } from "./api";

export const initMenu = (router,store)=>{
    if(store.state.routes.length>0){
        return;
    }else{
        getRequest('/menu').then(data =>{
            if(data){
                //格式化之后的router
                let fmtRoutes = formatRoutes(data);
                //添加到路由
                router.addRoutes(fmtRoutes);
                //存入到store中（vuex）
                store.commit('initRoutes',fmtRoutes);
            }
        })
    }
}


export const formatRoutes=(routes)=>{
    let fmtRoutes = [];
    routes.forEach(router=>{
        let{
            path,
            component,
            name,
            iconCls,
            children,
        } = router;
        if(children && children instanceof Array){
            //递归
            children = formatRoutes(children);
        }
        let fmtRouter = {
            path : path,
            name: name,
            iconCls : iconCls,
            children : children,
            component(resolve){
                require(['../views/'+component+'.vue'],resolve);
                if(component == "AddCarpet" || component == "CarpetInfo" ||component == "CarpetList" ||component == "SellInfo" ||component == "StockInfo" ){
                    require(['../views/carpetInfo/'+component+'.vue'],resolve);
                }else if(component == "CarpetShow" || component == "CarpetShowList"){
                    require(['../views/CarpetShow/'+component+'.vue'],resolve);
                }else if(component == "Profit" || component == "ProfitInfo"){
                    require(['../views/Profit/'+component+'.vue'],resolve);
                }else if(component == "System" || component == "AccountInfo"|| component == "Global"|| component == "Syslog"){
                    require(['../views/System/'+component+'.vue'],resolve);
                }
            }
        }
        fmtRoutes.push(fmtRouter);
    });
    return fmtRoutes;
}