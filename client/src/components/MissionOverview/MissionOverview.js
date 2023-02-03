//React setup
import React from 'react';
//styling
import styles from '../../styling/styling.module.css';

const MissionOverview = () => {
    return (
        <div className={styles.missionOverview}>
            <p className={styles.missionDescription}>
                The <strong>Opportunity</strong> Rover was launched on 2003-07-07 UTC, and
                landed on Mars 2004-01-25 UTC.  <strong>Opportunity</strong>'s mission was
                to work as a mechanical geologist, investigating the possibility that Mars
                was <em>wetter</em> - and capable of sustaining microbial life - in its
                ancient past.  <strong>Opportunity</strong>'s landing site was <em>
                Meridiani Planum</em>, thought to be a possible former lake in a giant
                impact crater.
            </p>
            <p className={styles.missionDescription}>
                <strong>Opportunity</strong> worked on Mars for nearly fifteen years, last
                communicating with Earth on 2018-06-11 UTC as it succumbed to a planet-wide
                dust storm.  <strong>Opportunity</strong> broke the record for extraterrestrial
                travel, racking up 28.06 miles of martian mobility over the course of its mission.
            </p>
            <p className={styles.missionDescription}>
                <strong>Opportunity</strong>'s most notable scientific discoveries include:
                finding the mineral <em>hematite</em> - which typically forms in water - in the
                <em>Meridiani Planum</em> impact crater in which it landed; finding veins of
                <em>gypsum</em> in the rocks near the rim of <em>Endeavor Crater</em>, thought
                to emanate from a time when water flowed through underground fractures in the
                rocks; and finding <em>clay minerals</em> formed in <em>pH-neutral water</em> in the environment at Endeavor Crater.
            </p>
            <p className={styles.missionDescription}>
                The following slideshow displays ten photos taken by the <strong>Opportunity</strong> Rover.
                This app provides access to all 198,439 photos detailed by the <em>NASA
                Mars Rover API</em>; click the button below the slideshow to view the images.
            </p>
        </div>
    )
};

export default MissionOverview;