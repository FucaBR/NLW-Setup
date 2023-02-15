interface ProgressBarProps {
    progress: number
}

export function ProgressBar(props: ProgressBarProps) {
    return ( 
       <div className='rounded-xl h-3 bg-zinc-700 w-full mt-4'>
            <div
                role='progressbar' 
                aria-label="Progesso de hábitos completados no dia" 
                aria-valuenow={props.progress} 
                className='rounded-xl h-3 bg-violet-600 transition-all' 
                style={{ width: `${props.progress}%` 
                }}
                />
            </div>
    )
}
