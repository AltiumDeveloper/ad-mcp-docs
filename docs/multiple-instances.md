# If you run more than one copy of Altium Designer

You can have several Altium Designer instances open at the same time — for example one per
project. Only one of them answers a given conversation.

**How the target is chosen.** Every running instance registers itself when it starts, and
one of them is the *active* one — the first to register, or whichever was switched to last.
A new conversation binds to the active instance and **stays with it**: starting another
Altium Designer afterwards does not move it.

**How a conversation moves.** Three ways, and only three. You switch it. Or the instance it
was using has closed — in which case the next request is **refused** with a note asking you
to confirm the new target, so call the switch tool once and retry; if several instances are
left, you are asked which. Or someone switched elsewhere: the active instance is shared
across your machine, so a switch made in another conversation — or in another AI client —
retargets the others too.

**Switching deliberately.** The assistant always has a `switch_altium_instance` tool: asked
without an argument it lists the instances and marks the one this conversation is using;
given an instance id it switches. One switch covers every Altium tool set in the
conversation, so *"list the Altium instances and switch to the one with the power supply
project"* is enough.

**Pinning a client to one instance.** If you always want a particular client bound to a
particular instance, add `--instance-id <id>` to the bridge command in that client's
configuration file. A session fixed that way refuses to switch.

So if an answer describes the wrong board, ask which instance the session is using — that
is one question, and it is the first thing to check.
