exports.createResponse = (res, data, status, success=true, errorMsg=null) => {
    res.status(status).json({
        data,
        success,
        errorMsg,
        total: (data || []).length
    });
}