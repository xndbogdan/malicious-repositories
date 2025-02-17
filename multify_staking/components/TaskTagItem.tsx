import React from 'react'

//Task Tag Item
export default function TasksTagItem(props: any) {
  return (
    <>
    <div className="w-full text-center text-sm font-Ubuntu-Medium py-2 px-8 bg-jade-900 rounded-sm cursor-pointer md:w-auto" onClick={props.onclick}>
      {props?.name}
    </div>
  </>
  )
}
