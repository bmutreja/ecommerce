class ApiFeatures {
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search(){
        const keyword = this.queryString.keyword ? {
            title: {
                $regex : this.queryString.keyword,
                $options: 'i'
            }
        } : {}
        console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryString};
    
        //removing fields from query
        const removeFields = ['keyword','limit','page'];
        removeFields.forEach(el => delete queryCopy[el]);

        //Advance filter for price and rating
        let querystr = JSON.stringify(queryCopy);
        // glt greter then equalto lte less then equal to
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        // console.log(querystr);

        this.query = this.query.find(JSON.parse(querystr));
        return this;


    }

    pagination(resPerPage){
        const curruntPage = Number(this.queryString.page) || 1;
        const skip = resPerPage * (curruntPage -1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;

    }
}


module.exports = ApiFeatures;