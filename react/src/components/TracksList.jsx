import { Table } from "@mantine/core"
import { useRef, useEffect, useState } from "react"
import { RangeSlider } from "@mantine/core"

export default function TracksList(props) {
    const [sort_flag, setSortFlag] = useState()
    const [audio, setAudio] = useState()
    const [tracks_copy, setTracksCopy] = useState({...props.tracks})

    const [default_range, setDefaultRange] = useState()
    const [range, setRange] = useState()

    const time_tracked = useRef()
    const tracks_table = useRef()

    useEffect(() => {
        audio?.pause()
    }, [props.tracks, tracks_copy])

    useEffect(() => {
        tracks_table.current?.scrollIntoView({ behavior: "smooth" })
        setTracksCopy({...props.tracks})

        var min = Math.round(props.tracks.items[0].audio_features.tempo)
        var max = Math.round(props.tracks.items[0].audio_features.tempo)

        props.tracks.items.map(val => {
            if (Math.round(val.audio_features.tempo) < min)
                min = Math.round(val.audio_features.tempo)

            if (Math.round(val.audio_features.tempo) > max)
                max = Math.round(val.audio_features.tempo)
        })

        setRange([min, max])
        setDefaultRange([min, max])
    }, [props.tracks])

    useEffect(() => {
        audio?.play()
        time_tracked.current = new Date().getTime()
    }, [audio])

    useEffect(() => {
        if (range) {
            tracks_copy.items = props.tracks.items.filter(val => Math.round(val.audio_features.tempo) >= range[0] && Math.round(val.audio_features.tempo) <= range[1])
            setSortFlag(null)
        }
    }, [range])

    const sortByName = () => {
        if (sort_flag != 'name') {
            tracks_copy.items = [...tracks_copy.items].sort((a, b) => a.track.name > b.track.name ? 1 : -1)
            setSortFlag('name')
        } else {
            tracks_copy.items = [...tracks_copy.items].sort((a, b) => a.track.name < b.track.name ? 1 : -1)
            setSortFlag(null)
        }
    }

    const sortByBPM = () => {
        if (sort_flag != 'bpm') {
            tracks_copy.items = [...tracks_copy.items].sort((a, b) => a.audio_features?.tempo - b.audio_features?.tempo)
            setSortFlag('bpm')
        } else {
            tracks_copy.items = [...tracks_copy.items].sort((a, b) => b.audio_features?.tempo - a.audio_features?.tempo)
            setSortFlag(null)
        }
    }

    const handleAudio = (url) => {
        audio?.pause(); 
        // If 29 seconds (duration of preview song) has passed, then can replay it, instead of pausing it
        if (audio?.src == url && new Date().getTime() - time_tracked.current <= 29000) {
            setAudio(null)
        } else {
            setAudio(new Audio(url))
        }
    }

    const rows = tracks_copy.items.map((element) => {
        return (
            <Table.Tr key={element.track.id}>
                <Table.Td><img onClick={() => handleAudio(element.track.preview_url)} className="w-16 aspect-square" src={element.track.album.images[0]?.url} /></Table.Td>
                <Table.Td>{element.track.name}</Table.Td>
                <Table.Td>{element.audio_features?.tempo ? Math.round(element.audio_features?.tempo) : ""}</Table.Td>
            </Table.Tr>
        )
    })
        
    return (
        <>
            { range && 
                <div className="bg-green-500 p-10 flex justify-center">
                    <RangeSlider labelAlwaysOn className='w-full' minRange={5} value={range} min={default_range[0]} max={default_range[1]} onChange={setRange} />
                </div>
            }

            <Table ref={tracks_table} className="scroll-mt-[60px]">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th onClick={sortByName}>Name</Table.Th>
                        <Table.Th onClick={sortByBPM}>BPM</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    )
}