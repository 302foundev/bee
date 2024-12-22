import { Button } from "./ui/Button"
import { motion } from "framer-motion"
import { deleteUser, updateUserData } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { ConfirmingDeleteModal } from "./ConfirmingDeleteModal"
import { Save, TriangleAlert, Loader2 } from "lucide-react"
import { toast } from "sonner"

export const UserProfileUpdate = () => {
  const { user } = useAuth()

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  interface UserProfileUpdateFormElements extends HTMLFormControlsCollection {
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
  }

  interface UserProfileUpdateForm extends HTMLFormElement {
    elements: UserProfileUpdateFormElements;
  }

  const handleSubmit = async (event: React.FormEvent<UserProfileUpdateForm>) => {
    event.preventDefault();

    const firstName = event.currentTarget.elements.firstName.value;
    const lastName = event.currentTarget.elements.lastName.value;

    const response = await updateUserData({
      first_name: firstName,
      last_name: lastName,
    });

    if (!response.ok) {
      toast.error('Error updating profile');
      return;
    }

    toast.success('Profile updated successfully');
  };

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      await deleteUser()

      toast.success("Account deleted successfully. Redirecting...")

      setTimeout(() => {
        window.location.href = '/signin'
      }, 2000)
    }

    catch (error) {
      console.error(`Error deleting user: ${error}`)
      toast.error("Error deleting the account")
    } finally {
      setIsDeleting(false)
      setIsConfirmingDelete(false)
    }
  }

  return (
    <motion.div
      className="mt-8 bg-transparent"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "linear" }}
    >
      <div className="px-4 mx-auto space-y-8 max-w-screen-2xl">
        <div className="overflow-hidden bg-transparent border rounded-md shadow border-zinc-300 dark:border-zinc-800 sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-3xl font-semibold leading-6 text-neutral-900 dark:text-white">
              General
            </h2>
            <p className="mt-3 text-sm">
              Modify your personal information:
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="firstName"
                    className="block font-medium dark:text-neutral-200"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="John"
                    autoComplete="given-name"
                    className="w-full px-4 py-2 mt-1 bg-transparent border rounded-md border-neutral-400 dark:border-zinc-800 focus:border-zinc-950"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="lastName"
                    className="block font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Doe"
                    autoComplete="family-name"
                    className="w-full px-4 py-2 mt-1 bg-transparent border rounded-md border-neutral-400 dark:border-zinc-800"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block font-medium"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={user?.email}
                    autoComplete="email"
                    className="w-full px-4 py-2 mt-1 bg-transparent border rounded-md border-neutral-400 dark:border-zinc-800"
                    disabled
                  />
                  <span className="flex items-center gap-1 mt-2 text-sm text-red-500 dark:text-red-400">
                    <TriangleAlert className="text-red-500" />
                    You can't change your email address
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end w-full mt-8">
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="flex items-center gap-2 text-white rounded-md"
                >
                  <Save className="w-5 h-5" />
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col px-5 py-5 bg-white border rounded-md border-neutral-300 dark:border-zinc-800 dark:bg-transparent lg:mt-0 sm:mt-28">
          <div>
            <h2 className="text-3xl font-semibold">Account</h2>
            <p className="mt-3 text-sm">
              Update your account settings:
            </p>
          </div>

          <div className="w-full gap-2 mt-8">
            <h4>Delete account:</h4>
            <Button
              variant="ghost"
              onClick={() => setIsConfirmingDelete(true)}
              className="flex items-center justify-center w-full gap-2 py-2 mx-0 mt-2 transition ease-linear bg-red-600 rounded-md text-neutral-200 hover:bg-red-700 md:w-48 lg:w-48"
            >
              {isDeleting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Delete account"
              )}
            </Button>
          </div>
        </div>
      </div>

      <ConfirmingDeleteModal
        isDeleting={isDeleting}
        isOpen={isConfirmingDelete}
        onClose={() => setIsConfirmingDelete(false)}
        handleDelete={handleDelete}
      />
    </motion.div>
  )
}
