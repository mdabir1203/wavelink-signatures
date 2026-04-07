import { motion } from "framer-motion";
import { Users, Target, HeartHandshake, Video } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface StepRoleProps {
  lang: Language;
}

const StepRole = ({ lang }: StepRoleProps) => {
  const tasks = [
    { icon: Users, labelKey: "roleTask1" as const, descKey: "roleTask1Desc" as const },
    { icon: Target, labelKey: "roleTask2" as const, descKey: "roleTask2Desc" as const },
    { icon: HeartHandshake, labelKey: "roleTask3" as const, descKey: "roleTask3Desc" as const },
    { icon: Video, labelKey: "roleTask4" as const, descKey: "roleTask4Desc" as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col flex-1 px-8 gap-5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display">{t(lang, "roleTitle")}</h2>
        <p className="text-muted-foreground text-sm font-body">{t(lang, "roleSubtitle")}</p>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => (
          <motion.div
            key={task.labelKey}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 * i }}
            className="glass-card rounded-xl p-4 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-wavelink-teal/10 flex items-center justify-center shrink-0">
              <task.icon className="w-5 h-5 text-wavelink-teal" />
            </div>
            <div>
              <p className="font-semibold text-sm">{t(lang, task.labelKey)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t(lang, task.descKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl p-4 border-wavelink-teal/20"
      >
        <p className="text-xs text-wavelink-teal font-medium text-center font-body">
          {t(lang, "roleTip")}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default StepRole;
