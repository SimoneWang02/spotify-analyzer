import { Table } from "@mantine/core"
import { useRef, useEffect, useState } from "react"

export default function TracksList(props) {
    const tableTracksRef = useRef()
    var tracks = props.tracks?.items

    useEffect(() => {
        tableTracksRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    const sortByName = () => {
        props.tracks.items = [...tracks].sort((a, b) => a.track.name > b.track.name ? 1 : -1)
        props.function(props.tracks)
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
                    <Table.Th>BPM</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}