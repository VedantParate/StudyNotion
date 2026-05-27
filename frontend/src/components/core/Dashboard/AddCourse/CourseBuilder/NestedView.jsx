// src/components/core/Dashboard/AddCourse/CourseBuilder/NestedView.jsx

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus }          from "react-icons/fa"
import { MdEdit }          from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiSolidVideos }    from "react-icons/bi"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseOperationsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({
  handleChangeEditSectionName,
  setConfirmationModal,
}) {
  const { course } = useSelector((state) => state.course)
  const { token }  = useSelector((state) => state.auth)
  const dispatch   = useDispatch()

  // Which sections are collapsed
  const [collapsed,      setCollapsed]      = useState({})
  // Modal state: null | "add" | "view" | "edit"
  const [addSubSection,  setAddSubSection]  = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)

  function handleCollapse(sectionId) {
    setCollapsed((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  async function handleDeleteSection(sectionId) {
    const result = await deleteSection({ sectionId, courseId: course._id }, token)
    if (result) dispatch(setCourse(result))
    setConfirmationModal(null)
  }

  async function handleDeleteSubSection(subSectionId, sectionId) {
    const result = await deleteSubSection({ subSectionId, sectionId }, token)
    if (result) {
      // Merge updated section back into course
      const updatedCourse = {
        ...course,
        courseContent: course.courseContent.map((sec) =>
          sec._id === sectionId ? result : sec
        ),
      }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <div className="rounded-lg bg-richblack-700 p-6 space-y-4">
      {course?.courseContent?.map((section) => (
        <div key={section._id} className="overflow-hidden rounded-lg bg-richblack-600">

          {/* ── Section Header ────────────────────────────────────── */}
          <div className="flex cursor-pointer items-center justify-between
                          bg-richblack-600 px-5 py-3">

            {/* Left — collapse icon + name */}
            <div
              className="flex items-center gap-x-3"
              onClick={() => handleCollapse(section._id)}
            >
              <AiFillCaretDown
                className={`text-richblack-300 transition-transform ${
                  collapsed[section._id] ? "-rotate-90" : ""
                }`}
              />
              <p className="font-semibold text-richblack-5">
                {section.sectionName}
              </p>
            </div>

            {/* Right — edit / delete section */}
            <div className="flex items-center gap-x-3">
              <button
                type="button"
                onClick={() =>
                  handleChangeEditSectionName(
                    section._id,
                    section.sectionName
                  )
                }
                className="text-richblack-300 hover:text-richblack-5"
              >
                <MdEdit fontSize={20} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setConfirmationModal({
                    text1:       "Delete this section?",
                    text2:       "All lectures inside this section will also be deleted.",
                    btn1Text:    "Delete",
                    btn2Text:    "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="text-richblack-300 hover:text-pink-200"
              >
                <RiDeleteBin6Line fontSize={20} />
              </button>
              <span className="text-richblack-500">|</span>
              <button
                type="button"
                onClick={() => setAddSubSection(section._id)}
                className="flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus fontSize={14} />
                <span className="text-sm font-medium">Add Lecture</span>
              </button>
            </div>
          </div>

          {/* ── SubSection List ───────────────────────────────────── */}
          {!collapsed[section._id] && (
            <div className="px-5 pb-4 pt-2 space-y-2">
              {section.subSection?.map((sub) => (
                <div
                  key={sub._id}
                  className="flex items-center justify-between
                             rounded-md bg-richblack-900 px-4 py-2"
                >
                  {/* Left — video icon + title */}
                  <div
                    className="flex cursor-pointer items-center gap-x-3"
                    onClick={() => setViewSubSection(sub)}
                  >
                    <BiSolidVideos className="text-richblack-300" />
                    <p className="text-sm font-medium text-richblack-5">
                      {sub.title}
                    </p>
                  </div>

                  {/* Right — edit / delete subsection */}
                  <div className="flex items-center gap-x-3">
                    <button
                      type="button"
                      onClick={() =>
                        setEditSubSection({ ...sub, sectionId: section._id })
                      }
                      className="text-richblack-300 hover:text-richblack-5"
                    >
                      <MdEdit fontSize={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setConfirmationModal({
                          text1:       "Delete this lecture?",
                          text2:       "This lecture will be permanently deleted.",
                          btn1Text:    "Delete",
                          btn2Text:    "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(sub._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      className="text-richblack-300 hover:text-pink-200"
                    >
                      <RiDeleteBin6Line fontSize={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {!section.subSection?.length && (
                <p className="text-center text-sm text-richblack-400">
                  No lectures added yet
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* ── SubSection Modals ────────────────────────────────────────── */}
      {addSubSection && (
        <SubSectionModal
          modalType="add"
          sectionId={addSubSection}
          setModalData={setAddSubSection}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalType="view"
          sectionId={viewSubSection?.sectionId}
          subSection={viewSubSection}
          setModalData={setViewSubSection}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalType="edit"
          sectionId={editSubSection?.sectionId}
          subSection={editSubSection}
          setModalData={setEditSubSection}
        />
      )}
    </div>
  )
}