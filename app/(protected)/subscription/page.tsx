import SubscriptionSection from '@/components/subscription'
import HasSubsButton from '@/components/subscription/HasSubsButton'

export default function Subscription() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-12">
            <SubscriptionSection />
            <HasSubsButton />
        </div>
    )
}
