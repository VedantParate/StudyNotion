// src/components/core/Dashboard/Settings/DeleteAccount.jsx

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiTrash2 } from "react-icons/fi"
import { deleteProfile } from "../../../../services/operations/profileAPI"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function DeleteAccount() {
  const { token }  = useSelector((state) => state.auth)
  const dispatch   = useDispatch()
  const navigate   = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border border-pink-700
                      bg-pink-900 p-8 px-12">
        {/* Icon */}
        <div className="flex aspect-square h-14 w-14 items-center justify-center
                        rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>

        {/* Text + Button */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="text-sm text-pink-25 max-w-[65%] space-y-1">
            <p>Would you like to delete your account?</p>
            <p>
              This account contains courses. Deleting your account is permanent
              and will remove all the content associated with it.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2:
                  "Your account will be permanently deleted. This action cannot be undone.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(deleteProfile(token, navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="w-fit cursor-pointer italic text-pink-300 underline
                       hover:text-pink-200"
          >
            I want to delete my account
          </button>
        </div>
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  )
}