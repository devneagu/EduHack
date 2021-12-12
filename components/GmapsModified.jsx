import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, {useEffect, useRef, useState} from "react";
import { createCustomEqual } from "fast-equals";

const gmapsKey = 'AIzaSyB_9CxDgXZH_Tf-3hczc8mAqVSwakxn8fk';
const render = (status) => {
    return <h1>{status}</h1>;
};

export default function GmapsModified({rightLayout,callback,position,middleware}) {
    const [clicks, setClicks] = useState(() => {if(position !== undefined) return [position]; return [] } );
    const [zoom, setZoom] = useState(7);
    const [center, setCenter] = useState(() => position !== undefined ? position : { lat: 45.6363010353717, lng: 25.2 });


    const onClick = (e) => {
        if(middleware === undefined || middleware === true) {
            setClicks([e.latLng]);
            callback([e.latLng.toJSON()])
        }
    };
    const onIdle = (m) => {
        setZoom(m.getZoom());
        setCenter(m.getCenter().toJSON());
    };


    const form = (
        <div
            style={{
                padding: "1rem",
                flexBasis: "250px",
                height: "100%",
                overflow: "auto",
            }}
        >
            <label htmlFor="zoom">Zoom</label>
            <input
                type="number"
                id="zoom"
                name="zoom"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
            />
            <br />
            <label htmlFor="lat">Latitude</label>
            <input
                type="number"
                id="lat"
                name="lat"
                value={center.lat}
                onChange={(event) =>
                    setCenter({ ...center, lat: Number(event.target.value) })
                }
            />
            <br />
            <label htmlFor="lng">Longitude</label>
            <input
                type="number"
                id="lng"
                name="lng"
                value={center.lng}
                onChange={(event) =>
                    setCenter({ ...center, lng: Number(event.target.value) })
                }
            />
            <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>

            <button onClick={() => setClicks([])}>Clear</button>

        </div>
    );

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Wrapper apiKey={gmapsKey} render={render}>
                <Map
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    style={{ flexGrow: "1", height: "300px" }}
                >
                    {clicks.map((latLng, i) => (
                        <Marker key={i} position={latLng} />
                    ))}
                </Map>
                {rightLayout !== false &&
                    {form}
                }
            </Wrapper>
        </div>
    )
}


const Map = ({
                 onClick,
                 onIdle,
                 children,
                 style,
                 ...options
             }) => {
    const ref = useRef(null);
    const [map, setMap] = React.useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} style={style} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
};

const Marker = (options) => {
    const [marker, setMarker] = useState();

    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a, b) => {
        if (
            (a) ||
            a instanceof google.maps.LatLng ||
            (b) ||
            b instanceof google.maps.LatLng
        ) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }

        // TODO extend to other types

        // use fast-equals for other objects
        return deepEqual(a, b);
    }
);

function useDeepCompareMemoize(value) {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
