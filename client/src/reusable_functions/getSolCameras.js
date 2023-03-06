module.exports = async (sol) => {
    try {
        //request all the cameras
        const getAllSolCameras = await fetch(`utilities/getAllCameras/${sol}`, {
            method: 'GET'
        });
        //process the result
        const allSolCameras = await getAllSolCameras.json();
        //split the string into an array, and return the array
        return allSolCameras.split(", ");
    } catch(err) {
        return `${err.message}`;
    }
};