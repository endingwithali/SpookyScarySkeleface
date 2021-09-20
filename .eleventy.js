module.exports = function(config){

    config.addPassthroughCopy("src/js");
    return {
        dir: {
            input: "src",
            output: "dist" //auto generated, where files are outputed 
        }
    };
};