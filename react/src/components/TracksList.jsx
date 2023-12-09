import { Table } from "@mantine/core"
import { useRef, useEffect } from "react"

export default function TracksList(props) {
    if (!props.tracks)
        return

    const tableTracksRef = useRef()
    const tracks = props.tracks.items

    const rows = tracks.map((element) => {
        return (
            <Table.Tr key={element.track.id}>
                <Table.Td><img className="w-16 aspect-square" src={element.track.album.images[0]?.url} /></Table.Td>
                <Table.Td>{element.track.name}</Table.Td>
                <Table.Td>{element.audio_features?.tempo ? Math.round(element.audio_features?.tempo) : ""}</Table.Td>
            </Table.Tr>
        )
    })

    useEffect(() => {
        tableTracksRef.current?.scrollIntoView({ behavior: "smooth" })
    })

    return (
        <Table ref={tableTracksRef} className="scroll-mt-[60px]">
            <Table.Thead>
            <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>BPM</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}