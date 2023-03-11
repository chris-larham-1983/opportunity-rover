const getSolPhotos = async (sol) => {
    try {
        const getAllSolPhotos = await fetch(`/photos/${sol}/getAllPhotos`, {
            method: 'GET'
        });
        const allSolPhotos = await getAllSolPhotos.json();
        return allSolPhotos;
    } catch(err) {
        return `${err.message}`;
    }
};

export default getSolPhotos;