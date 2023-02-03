module.exports = async () => {
    try {
        const requestManifest = await fetch("https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=YPjczAtwJbSdpeaAxpCqWVCNbLnNAZAit5rdDI4v");
        const manifest = await requestManifest.json();
        return manifest;
    } catch(err) {
        console.error(err.message);
    }
};