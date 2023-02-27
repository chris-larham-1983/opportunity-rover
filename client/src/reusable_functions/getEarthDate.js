module.exports = async (sol) => {
    try {
        const retrieveEarthDate = await fetch(`/utilities/solToEarthDate/${sol}`, {
            method: 'GET'
        });
        const retrievedEarthDate = await retrieveEarthDate.json();
        const earthDate = retrievedEarthDate[0].earth_date;
        return earthDate;
    } catch(err) {
        return `${err.message}`;
    }
};