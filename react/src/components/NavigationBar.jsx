import { Button } from '@mantine/core';

export default function NavigationBar(props) {
    return (
        <div className="bg-black flex justify-between top-0 sticky w-full bg-opacity-50 p-3 z-10">
            <div>
                {/* Put Icon Here */}
                <div className="bg-blue-400 h-[36px] w-[36px]"></div>
            </div>
            <div className="w-full flex items-center justify-end space-x-4">
                <Button onClick={props.function}>Log out</Button>
            </div>
        </div>
    )
}