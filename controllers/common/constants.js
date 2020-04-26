let base_path = process.env.BASE_UPLOAD_DIR;

if (base_path === undefined) {
    base_path = '/home/x230/work/uploads/';
}

module.exports.USER_DP_PATH = base_path + 'dp/';
