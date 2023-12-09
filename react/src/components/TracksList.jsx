import { Table } from "@mantine/core"
import { useRef, useEffect, useState } from "react"

export default function TracksList(props) {
    const [flag, setFlag] = useState()
    const tableTracksRef = useRef()
    var tracks = props.tracks?.items

    useEffect(() => {
        tableTracksRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    const sortByName = () => {
        if (flag != 'name') {
            props.tracks.items = [...tracks].sort((a, b) => a.track.name > b.track.name ? 1 : -1)
            setFlag('name')
        } else {
            props.tracks.items = [...tracks].sort((a, b) => a.track.name < b.track.name ? 1 : -1)
            setFlag(null)
        }
    }

    const sortByBPM = () => {
        if (flag != 'bpm') {
            props.tracks.items = [...tracks].sort((a, b) => a.audio_features?.tempo - b.audio_features?.tempo)
            setFlag('bpm')
        } else {
            props.tracks.items = [...tracks].sort((a, b) => b.audio_features?.tempo - a.audio_features?.tempo)
            setFlag(null)
        }
    }

    const rows = tracks.map((element) => {
        return (
            <Table.Tr key={element.track.id}>
                <Table.Td><img className="w-16 aspect-square" src={element.track.album.images[0]?.url} /></Table.Td>
                <Table.Td>{element.track.name}</Table.Td>
                <Table.Td>{element.audio_features?.tempo ? Math.round(element.audio_features?.tempo) : ""}</Table.Td>
            </Table.Tr>
        )
    })
        
    return (
        <Table ref={tableTracksRef} className="scroll-mt-[60px]">
            <Table.Thead>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th onClick={sortByName}>Name</Table.Th>
                    <Table.Th onClick={sortByBPM}>BPM</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}