//React setup
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//styling
import styles from '../styling/styling.module.css';
//components
import AppHeading from '../components/AppHeading/AppHeading';
import PageTraversal from "../components/PageTraversal/PageTraversal";
import IntroPageReturn from "../components/IntroPageReturn/IntroPageReturn";
import CameraAbbreviations from "../components/CameraAbbreviations/CameraAbbreviations";
import SolLink from '../components/SolLink/SolLink';

//page that displays: a link back to the app intro page; information on the camera abbreviations used in the app; and links to all sols on which the Opportunity Rover took photos
const SolSelectPage = ({ page }) => {

    //variables to store/set all the manifest details
    const [manifestDetails, setManifestDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigateToSol = useRef(null);

    //variables to ensure that manifest is only requested once
    const manifestRequests = useRef(0);

    const [lastLoaded, setLastLoaded] = useState(null);
    const [min, setMin] = useState(null);

    const [_100, set_100] = useState([]);
    const [_200, set_200] = useState([]);
    const [_300, set_300] = useState([]);
    const [_400, set_400] = useState([]);
    const [_500, set_500] = useState([]);
    const [_600, set_600] = useState([]);
    const [_700, set_700] = useState([]);
    const [_800, set_800] = useState([]);
    const [_900, set_900] = useState([]);
    const [_1000, set_1000] = useState([]);
    const [_1100, set_1100] = useState([]);
    const [_1200, set_1200] = useState([]);
    const [_1300, set_1300] = useState([]);
    const [_1400, set_1400] = useState([]);
    const [_1500, set_1500] = useState([]);
    const [_1600, set_1600] = useState([]);
    const [_1700, set_1700] = useState([]);
    const [_1800, set_1800] = useState([]);
    const [_1900, set_1900] = useState([]);
    const [_2000, set_2000] = useState([]);
    const [_2100, set_2100] = useState([]);
    const [_2200, set_2200] = useState([]);
    const [_2300, set_2300] = useState([]);
    const [_2400, set_2400] = useState([]);
    const [_2500, set_2500] = useState([]);
    const [_2600, set_2600] = useState([]);
    const [_2700, set_2700] = useState([]);
    const [_2800, set_2800] = useState([]);
    const [_2900, set_2900] = useState([]);
    const [_3000, set_3000] = useState([]);
    const [_3100, set_3100] = useState([]);
    const [_3200, set_3200] = useState([]);
    const [_3300, set_3300] = useState([]);
    const [_3400, set_3400] = useState([]);
    const [_3500, set_3500] = useState([]);
    const [_3600, set_3600] = useState([]);
    const [_3700, set_3700] = useState([]);
    const [_3800, set_3800] = useState([]);
    const [_3900, set_3900] = useState([]);
    const [_4000, set_4000] = useState([]);
    const [_4100, set_4100] = useState([]);
    const [_4200, set_4200] = useState([]);
    const [_4300, set_4300] = useState([]);
    const [_4400, set_4400] = useState([]);
    const [_4500, set_4500] = useState([]);
    const [_4600, set_4600] = useState([]);
    const [_4700, set_4700] = useState([]);
    const [_4800, set_4800] = useState([]);
    const [_4810, set_4810] = useState([]);

    const [show200, setShow200] = useState(false);
    const [show300, setShow300] = useState(false);
    const [show400, setShow400] = useState(false);
    const [show500, setShow500] = useState(false);
    const [show700, setShow700] = useState(false);
    const [show800, setShow800] = useState(false);
    const [show900, setShow900] = useState(false);
    const [show1000, setShow1000] = useState(false);
    const [show1200, setShow1200] = useState(false);
    const [show1300, setShow1300] = useState(false);
    const [show1400, setShow1400] = useState(false);
    const [show1500, setShow1500] = useState(false);
    const [show1700, setShow1700] = useState(false);
    const [show1800, setShow1800] = useState(false);
    const [show1900, setShow1900] = useState(false);
    const [show2000, setShow2000] = useState(false);
    const [show2200, setShow2200] = useState(false);
    const [show2300, setShow2300] = useState(false);
    const [show2400, setShow2400] = useState(false);
    const [show2500, setShow2500] = useState(false);
    const [show2700, setShow2700] = useState(false);
    const [show2800, setShow2800] = useState(false);
    const [show2900, setShow2900] = useState(false);
    const [show3000, setShow3000] = useState(false);
    const [show3200, setShow3200] = useState(false);
    const [show3300, setShow3300] = useState(false);
    const [show3400, setShow3400] = useState(false);
    const [show3500, setShow3500] = useState(false);
    const [show3700, setShow3700] = useState(false);
    const [show3800, setShow3800] = useState(false);
    const [show3900, setShow3900] = useState(false);
    const [show4000, setShow4000] = useState(false);
    const [show4200, setShow4200] = useState(false);
    const [show4300, setShow4300] = useState(false);
    const [show4400, setShow4400] = useState(false);
    const [show4500, setShow4500] = useState(false);
    const [show4700, setShow4700] = useState(false);
    const [show4800, setShow4800] = useState(false);
    const [show4810, setShow4810] = useState(false);


    //function called when the 'LOAD NEXT 100 SOLS' <button> is clicked
    const loadNextHundredSols = () => {
        if(page === 1) {
            if(!show200) {
                setShow200(true);
                setLastLoaded(manifestDetails[199].sol);
            } else if(!show300) {
                setShow300(true);
                setLastLoaded(manifestDetails[299].sol);
            } else if(!show400) {
                setShow400(true);
                setLastLoaded(manifestDetails[399].sol);
            } else if(!show500) {
                setShow500(true);
                setLastLoaded(manifestDetails[499].sol);
            }
        } else if(page === 2) {
            if(!show700) {
                setShow700(true);
                setLastLoaded(manifestDetails[699].sol);
            } else if(!show800) {
                setShow800(true);
                setLastLoaded(manifestDetails[799].sol);
            } else if(!show900) {
                setShow900(true);
                setLastLoaded(manifestDetails[899].sol);
            } else if(!show1000) {
                setShow1000(true);
                setLastLoaded(manifestDetails[999].sol);
            }
        } else if(page === 3) {
            if(!show1200) {
                setShow1200(true);
                setLastLoaded(manifestDetails[1199].sol);
            } else if(!show1300) {
                setShow1300(true);
                setLastLoaded(manifestDetails[1299].sol);
            } else if(!show1400) {
                setShow1400(true);
                setLastLoaded(manifestDetails[1399].sol);
            } else if(!show1500) {
                setShow1500(true);
                setLastLoaded(manifestDetails[1499].sol);
            }
        } else if(page === 4) {
            if(!show1700) {
                setShow1700(true);
                setLastLoaded(manifestDetails[1699].sol);
            } else if(!show1800) {
                setShow1800(true);
                setLastLoaded(manifestDetails[1799].sol);
            } else if(!show1900) {
                setShow1900(true);
                setLastLoaded(manifestDetails[1899].sol);
            } else if(!show2000) {
                setShow2000(true);
                setLastLoaded(manifestDetails[1999].sol);
            }
        } else if(page === 5) {
            if(!show2200) {
                setShow2200(true);
                setLastLoaded(manifestDetails[2199].sol);
            } else if(!show2300) {
                setShow2300(true);
                setLastLoaded(manifestDetails[2299].sol);
            } else if(!show2400) {
                setShow2400(true);
                setLastLoaded(manifestDetails[2399].sol);
            } else if(!show2500) {
                setShow2500(true);
                setLastLoaded(manifestDetails[2499].sol);
            }
        } else if(page === 6) {
            if(!show2700) {
                setShow2700(true);
                setLastLoaded(manifestDetails[2699].sol);
            } else if(!show2800) {
                setShow2800(true);
                setLastLoaded(manifestDetails[2799].sol);
            } else if(!show2900) {
                setShow2900(true);
                setLastLoaded(manifestDetails[2899].sol);
            } else if(!show3000) {
                setShow3000(true);
                setLastLoaded(manifestDetails[2999].sol);
            }
        } else if(page === 7) {
            if(!show3200) {
                setShow3200(true);
                setLastLoaded(manifestDetails[3199].sol);
            } else if(!show3300) {
                setShow3300(true);
                setLastLoaded(manifestDetails[3299].sol);
            } else if(!show3400) {
                setShow3400(true);
                setLastLoaded(manifestDetails[3399].sol);
            } else if(!show3500) {
                setShow3500(true);
                setLastLoaded(manifestDetails[3499].sol);
            }
        } else if(page === 8) {
            if(!show3700) {
                setShow3700(true);
                setLastLoaded(manifestDetails[3699].sol);
            } else if(!show3800) {
                setShow3800(true);
                setLastLoaded(manifestDetails[3799].sol);
            } else if(!show3900) {
                setShow3900(true);
                setLastLoaded(manifestDetails[3899].sol);
            } else if(!show4000) {
                setShow4000(true);
                setLastLoaded(manifestDetails[3999].sol);
            }
        } else if(page === 9) {
            if(!show4200) {
                setShow4200(true);
                setLastLoaded(manifestDetails[4199].sol);
            } else if(!show4300) {
                setShow4300(true);
                setLastLoaded(manifestDetails[4299].sol);
            } else if(!show4400) {
                setShow4400(true);
                setLastLoaded(manifestDetails[4399].sol);
            } else if(!show4500) {
                setShow4500(true);
                setLastLoaded(manifestDetails[4499].sol);
            }
        } else if(page === 10) {
            if(!show4700) {
                setShow4700(true);
                setLastLoaded(manifestDetails[4699].sol);
            } else if(!show4800) {
                setShow4800(true);
                setLastLoaded(manifestDetails[4799].sol);
            } else if(!show4810) {
                setShow4810(true);
                setLastLoaded(manifestDetails[4809].sol);
            }
        }
    };

    //function to obtain manifest details
    const getManifestDetails = async () => {
        try {
            const getManifestDetails = await fetch('/manifest/getManifestDetails', {
                method: 'GET'
            });
            const manifestDetails = await getManifestDetails.json();
            //set errorMessage to null if no error has been thrown by this point in the code
            setErrorMessage(null);
            set_100(manifestDetails.slice(0, 100));
            set_200(manifestDetails.slice(100, 200));
            set_300(manifestDetails.slice(200, 300));
            set_400(manifestDetails.slice(300, 400));
            set_500(manifestDetails.slice(400, 500));
            set_600(manifestDetails.slice(500, 600));
            set_700(manifestDetails.slice(600, 700));
            set_800(manifestDetails.slice(700, 800));
            set_900(manifestDetails.slice(800, 900));
            set_1000(manifestDetails.slice(900, 1000));
            set_1100(manifestDetails.slice(1000, 1100));
            set_1200(manifestDetails.slice(1100, 1200));
            set_1300(manifestDetails.slice(1200, 1300));
            set_1400(manifestDetails.slice(1300, 1400));
            set_1500(manifestDetails.slice(1400, 1500));
            set_1600(manifestDetails.slice(1500, 1600));
            set_1700(manifestDetails.slice(1600, 1700));
            set_1800(manifestDetails.slice(1700, 1800));
            set_1900(manifestDetails.slice(1800, 1900));
            set_2000(manifestDetails.slice(1900, 2000));
            set_2100(manifestDetails.slice(2000, 2100));
            set_2200(manifestDetails.slice(2100, 2200));
            set_2300(manifestDetails.slice(2200, 2300));
            set_2400(manifestDetails.slice(2300, 2400));
            set_2500(manifestDetails.slice(2400, 2500));
            set_2600(manifestDetails.slice(2500, 2600));
            set_2700(manifestDetails.slice(2600, 2700));
            set_2800(manifestDetails.slice(2700, 2800));
            set_2900(manifestDetails.slice(2800, 2900));
            set_3000(manifestDetails.slice(2900, 3000));
            set_3100(manifestDetails.slice(3000, 3100));
            set_3200(manifestDetails.slice(3100, 3200));
            set_3300(manifestDetails.slice(3200, 3300));
            set_3400(manifestDetails.slice(3300, 3400));
            set_3500(manifestDetails.slice(3400, 3500));
            set_3600(manifestDetails.slice(3500, 3600));
            set_3700(manifestDetails.slice(3600, 3700));
            set_3800(manifestDetails.slice(3700, 3800));
            set_3900(manifestDetails.slice(3800, 3900));
            set_4000(manifestDetails.slice(3900, 4000));
            set_4100(manifestDetails.slice(4000, 4100));
            set_4200(manifestDetails.slice(4100, 4200));
            set_4300(manifestDetails.slice(4200, 4300));
            set_4400(manifestDetails.slice(4300, 4400));
            set_4500(manifestDetails.slice(4400, 4500));
            set_4600(manifestDetails.slice(4500, 4600));
            set_4700(manifestDetails.slice(4600, 4700));
            set_4800(manifestDetails.slice(4700, 4800));
            set_4810(manifestDetails.slice(4800, 4810));
            return manifestDetails;
        } catch(err) {
            setErrorMessage(`The following error occurred while loading the page: ${err.message}.  Please try refreshing the page.`);
        }
    };

    const defineMinAndLastLoaded = () => {
        switch(page) {
            case 1:
                setMin(1);
                if(!show200) {
                    setLastLoaded(105);
                } else if(!show300) {
                    setLastLoaded(206);
                } else if(!show400) {
                    setLastLoaded(311);
                } else if(!show500) {
                    setLastLoaded(412);
                } else {
                    setLastLoaded(513);
                }
                break;
            case 2:
                setMin(514);
                if(!show700) {
                    setLastLoaded(622);
                } else if(!show800) {
                    setLastLoaded(725);
                } else if(!show900) {
                    setLastLoaded(825);
                } else if(!show1000) {
                    setLastLoaded(926);
                } else {
                    setLastLoaded(1027);
                }
                break;
            case 3:
                setMin(1028);
                if(!show1200) {
                    setLastLoaded(1132);
                } else if(!show1300) {
                    setLastLoaded(1232);
                } else if(!show1400) {
                    setLastLoaded(1347);
                } else if(!show1500) {
                    setLastLoaded(1447);
                } else {
                    setLastLoaded(1549);
                }
                break;
            case 4:
                setMin(1550);
                if(!show1700) {
                    setLastLoaded(1651);
                } else if(!show1800) {
                    setLastLoaded(1752);
                } else if(!show1900) {
                    setLastLoaded(1855);
                } else if(!show2000) {
                    setLastLoaded(1955);
                } else {
                    setLastLoaded(2059);
                }
                break;
            case 5:
                setMin(2060);
                if(!show2200) {
                    setLastLoaded(2159);
                } else if(!show2300) {
                    setLastLoaded(2265);
                } else if(!show2400) {
                    setLastLoaded(2365);
                } else if(!show2500) {
                    setLastLoaded(2466);
                }  else {
                    setLastLoaded(2567);
                }
                break;
            case 6:
                setMin(2568);
                if(!show2700) {
                    setLastLoaded(2669);
                } else if(!show2800) {
                    setLastLoaded(2770);
                } else if(!show2900) {
                    setLastLoaded(2870);
                } else if(!show3000) {
                    setLastLoaded(2970);
                } else {
                    setLastLoaded(3070);
                }
                break;
            case 7:
                setMin(3071);
                if(!show3200) {
                    setLastLoaded(3171);
                } else if(!show3300) {
                    setLastLoaded(3274);
                } else if(!show3400) {
                    setLastLoaded(3386);
                } else if(!show3500) {
                    setLastLoaded(3488);
                } else {
                    setLastLoaded(3589);
                }
                break;
            case 8:
                setMin(3590);
                if(!show3700) {
                    setLastLoaded(3699);
                } else if(!show3800) {
                    setLastLoaded(3808);
                } else if(!show3900) {
                    setLastLoaded(3927);
                } else if(!show4000) {
                    setLastLoaded(4041);
                } else {
                    setLastLoaded(4169);
                }
                break;
            case 9:
                setMin(4171);
                if(!show4200) {
                    setLastLoaded(4292);
                } else if(!show4300) {
                    setLastLoaded(4396);
                } else if(!show4400) {
                    setLastLoaded(4500);
                } else if(!show4500) {
                    setLastLoaded(4620);
                } else {
                    setLastLoaded(4727);
                }
                break;
            case 10:
                setMin(4728);
                if(!show4700) {
                    setLastLoaded(4868);
                } else if(!show4800) {
                    setLastLoaded(4988);
                } else if(!show4810) {
                    setLastLoaded(5099);
                } else {
                    setLastLoaded(5111);
                }
                break;
        }
    };

    //page load logic
    useEffect(() => {
        //if no manifest request has been made OR an error was returned from the previous call
        if(manifestRequests.current === 0 || errorMessage) {
            getManifestDetails().then(manifestDetails => setManifestDetails(manifestDetails));
            manifestRequests.current += 1;
        }
        defineMinAndLastLoaded();
    }, [page]);

    //<SolSelectPage /> presentation
    return (
        <div className={styles.bodyStyles}>
            <AppHeading />
            <PageTraversal navigateToSol={navigateToSol} lastLoaded={lastLoaded} min={min} />
            <p className={styles.pageTraversal} style={{ textAlign: "center", height: "fit-content"}}>
                <span className={styles.loadingMessage} style={{ padding: "2px"}}>
                    <Link to={'/solSelect'} className={page === 1? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[1-513]</Link>
                    &nbsp; <Link to={'/solSelect2'} className={page === 2? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[514-1027]</Link>
                    &nbsp; <Link to={'/solSelect3'} className={page === 3? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[1028-1549]</Link>
                    &nbsp; <Link to={'/solSelect4'} className={page === 4? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[1550-2059]</Link>
                    &nbsp; <Link to={'/solSelect5'} className={page === 5? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[2060-2567]</Link>
                    &nbsp; <Link to={'/solSelect6'} className={page === 6? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[2568-3070]</Link>
                    &nbsp; <Link to={'/solSelect7'} className={page === 7? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[3071-3589]</Link>
                    &nbsp; <Link to={'/solSelect8'} className={page === 8? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[3590-4169]</Link>
                    &nbsp; <Link to={'/solSelect9'} className={page === 9? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[4171-4727]</Link>
                    &nbsp; <Link to={'/solSelect10'} className={page === 10? `${styles.linkStyles} ${styles.spanStylesKhaki}`: styles.linkStyles}>[4728-5111]</Link>
                </span>
            </p>
            <div className={styles.solLinkContainer}>
                <IntroPageReturn />
                <CameraAbbreviations />
                {errorMessage && <p className={styles.negativeFeedback}>{errorMessage}</p> }
                {page === 1 && _100 && _100.map((manifestItem, index) => (
                    <SolLink key={index} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 1 && show200 && _200.map((manifestItem, index) => (
                    <SolLink key={index + 100} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 1 && show300 && _300.map((manifestItem, index) => (
                    <SolLink key={index + 200} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 1 && show400 && _400.map((manifestItem, index) => (
                    <SolLink key={index + 300} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 1 && show500 && _500.map((manifestItem, index) => (
                    <SolLink key={index + 400} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 2 && _600 && _600.map((manifestItem, index) => (
                    <SolLink key={index + 500} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 2 && show700 && _700.map((manifestItem, index) => (
                    <SolLink key={index + 600} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 2 && show800 && _800.map((manifestItem, index) => (
                    <SolLink key={index + 700} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 2 && show900 && _900.map((manifestItem, index) => (
                    <SolLink key={index + 800} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 2 && show1000 && _1000.map((manifestItem, index) => (
                    <SolLink key={index + 900} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 3 && _1100 && _1100.map((manifestItem, index) => (
                    <SolLink key={index + 1000} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 3 && show1200 && _1200.map((manifestItem, index) => (
                    <SolLink key={index + 1100} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 3 && show1300 && _1300.map((manifestItem, index) => (
                    <SolLink key={index + 1200} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 3 && show1400 && _1400.map((manifestItem, index) => (
                    <SolLink key={index + 1300} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 3 && show1500 && _1500.map((manifestItem, index) => (
                    <SolLink key={index + 1400} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 4 && _1600 && _1600.map((manifestItem, index) => (
                    <SolLink key={index + 1500} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 4 && show1700 && _1700.map((manifestItem, index) => (
                    <SolLink key={index + 1600} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 4 && show1800 && _1800.map((manifestItem, index) => (
                    <SolLink key={index + 1700} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 4 && show1900 && _1900.map((manifestItem, index) => (
                    <SolLink key={index + 1800} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 4 && show2000 && _2000.map((manifestItem, index) => (
                    <SolLink key={index + 1900} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 5 && _2100 && _2100.map((manifestItem, index) => (
                    <SolLink key={index + 2000} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 5 && show2200 && _2200.map((manifestItem, index) => (
                    <SolLink key={index + 2100} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 5 && show2300 && _2300.map((manifestItem, index) => (
                    <SolLink key={index + 2200} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 5 && show2400 && _2400.map((manifestItem, index) => (
                    <SolLink key={index + 2300} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 5 && show2500 && _2500.map((manifestItem, index) => (
                    <SolLink key={index + 2400} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 6 && _2600 && _2600.map((manifestItem, index) => (
                    <SolLink key={index + 2500} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 6 && show2700 && _2700.map((manifestItem, index) => (
                    <SolLink key={index + 2600} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 6 && show2800 && _2800.map((manifestItem, index) => (
                    <SolLink key={index + 2700} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 6 && show2900 && _2900.map((manifestItem, index) => (
                    <SolLink key={index + 2800} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 6 && show3000 && _3000.map((manifestItem, index) => (
                    <SolLink key={index + 2900} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 7 && _3100 && _3100.map((manifestItem, index) => (
                    <SolLink key={index + 3000} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 7 && show3200 && _3200.map((manifestItem, index) => (
                    <SolLink key={index + 3100} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 7 && show3300 && _3300.map((manifestItem, index) => (
                    <SolLink key={index + 3200} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 7 && show3400 && _3400.map((manifestItem, index) => (
                    <SolLink key={index + 3300} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 7 && show3500 && _3500.map((manifestItem, index) => (
                    <SolLink key={index + 3400} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 8 && _3600 && _3600.map((manifestItem, index) => (
                    <SolLink key={index + 3500} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 8 && show3700 && _3700.map((manifestItem, index) => (
                    <SolLink key={index + 3600} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 8 && show3800 && _3800.map((manifestItem, index) => (
                    <SolLink key={index + 3700} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 8 && show3900 && _3900.map((manifestItem, index) => (
                    <SolLink key={index + 3800} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 8 && show4000 && _4000.map((manifestItem, index) => (
                    <SolLink key={index + 3900} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 9 && _4100 && _4100.map((manifestItem, index) => (
                    <SolLink key={index + 4000} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 9 && show4200 && _4200.map((manifestItem, index) => (
                    <SolLink key={index + 4100} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 9 && show4300 && _4300.map((manifestItem, index) => (
                    <SolLink key={index + 4200} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 9 && show4400 && _4400.map((manifestItem, index) => (
                    <SolLink key={index + 4300} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 9 && show4500 && _4500.map((manifestItem, index) => (
                    <SolLink key={index + 4400} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 10 && _4600 && _4600.map((manifestItem, index) => (
                    <SolLink key={index + 4500} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 10 && show4700 && _4700.map((manifestItem, index) => (
                    <SolLink key={index + 4600} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 10 && show4800 && _4800.map((manifestItem, index) => (
                    <SolLink key={index + 4700} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {page === 10 && show4810 && _4810.map((manifestItem, index) => (
                    <SolLink key={index + 4800} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} first_photo_url={manifestItem.first_photo_url} first_photo_alt={manifestItem.first_photo_alt} />
                ))}
                {((page === 1 && !show500)||(page === 2 && !show1000)||(page === 3 && !show1500)||(page === 4 && !show2000)||(page === 5 && !show2500)||(page === 6 && !show3000)||(page === 7 && !show3500)||(page === 8 && !show4000)||(page === 9 && !show4500)||(page === 10 && !show4810)) && <button onClick={loadNextHundredSols} className={styles.roverButton}>LOAD NEXT 100 SOLS</button>}
            </div>
        </div>
    )
};

export default SolSelectPage;