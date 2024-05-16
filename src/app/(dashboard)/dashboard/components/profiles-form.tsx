"use client"

import { ProfileInputForm } from "./profile-form-input"

interface ProfilesFormProps {
  leetcode: string | null
  codechef: string | null
  codeforces: string | null
}

export function ProfilesForm(props: ProfilesFormProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="flex w-full flex-col gap-3 rounded-lg border-2 p-4">
        <legend className="-ml-1 -mt-7 text-sm font-medium">
          Profile details
        </legend>
        <div className="grid gap-3">
          <ProfileInputForm
            label="Leetcode"
            name="leetcode"
            value={props.leetcode}
          />
        </div>
        <div className="grid gap-3">
          <ProfileInputForm
            label="Codechef"
            name="codechef"
            value={props.codechef}
          />
        </div>
        <div className="grid gap-3">
          <ProfileInputForm
            label="Codeforces"
            name="codeforces"
            value={props.codeforces}
          />
        </div>
      </div>
    </div>
  )
}
