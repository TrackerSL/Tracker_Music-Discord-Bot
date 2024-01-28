run: async (client, interaction) => {
    try{
        if (!queue || !queue.player || !queue.player.playing) return interaction.reply({ content: '❌ No music playing!', ephemeral: true });

        queue.stop(interaction.guild.id);

        const embed = new MessageEmbed()
            .setColor('#FF5733')
            .setAuthor('🛑')
            .setTitle('Music Stopped')
            .setURL('[^1^][6]')
            .setDescription("The journey stops, but the rhythm lives on.")

        await interaction.reply({ embeds: [embed] });
        await interaction.guild.leave(); // Add this line to leave the channel
    }catch(e){
        console.error(e);
    }
},
