module.exports = async (sol) => {
    try {
        //request all the cameras
        const getAllSolCameras = await fetch(`/utilities/getAllCameras/${sol}`, {
            method: 'GET'
        });
        //process the result
        const allSolCameras = await getAllSolCameras.json();
        //return the array of cameras
        return allSolCameras.cameras;
    } catch(err) {
        return `${err.message}`;
    }
};