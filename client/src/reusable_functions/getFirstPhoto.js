//function to get the first photo for the passed-in sol
module.exports = async (sol, setError) => {
    try {
        const getFirstPhoto = await fetch(`/photos/${sol}/getFirstPhoto`, {
            method: 'GET'
        });
        const firstPhoto = await getFirstPhoto.json();
        return firstPhoto;
    } catch(err) {
        setError(`${err.message}`);
    }
}