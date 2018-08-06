const filters = {
    cellEmptyValue: function (value) {
        if(value === 0){
            return value;
        }

        if(value == null || value == undefined || value ==''){
            return '-';
        }

        return value;
    }
}

export default filters;